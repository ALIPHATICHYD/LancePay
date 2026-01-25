import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createReferralEarning } from '@/lib/referral'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params
  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNumber: invoiceId },
    include: { user: { select: { name: true, wallet: { select: { address: true } } } } },
  })

  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  return NextResponse.json({
    invoiceNumber: invoice.invoiceNumber,
    freelancerName: invoice.user.name || 'Freelancer',
    description: invoice.description,
    amount: Number(invoice.amount),
    status: invoice.status,
    dueDate: invoice.dueDate,
    walletAddress: invoice.user.wallet?.address,
  })
}

export async function POST(_request: NextRequest, { params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params
  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNumber: invoiceId },
    include: {
      user: {
        select: {
          id: true,
          referredById: true
        }
      }
    }
  })

  if (!invoice || invoice.status !== 'pending') {
    return NextResponse.json({ error: 'Invalid invoice' }, { status: 400 })
  }

  await prisma.$transaction([
    prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: 'paid', paidAt: new Date() }
    }),
    prisma.transaction.create({
      data: {
        userId: invoice.userId,
        type: 'incoming',
        status: 'completed',
        amount: invoice.amount,
        currency: invoice.currency,
        invoiceId: invoice.id,
        completedAt: new Date()
      }
    })
  ])

  if (invoice.user.referredById) {
    await createReferralEarning({
      referrerId: invoice.user.referredById,
      referredUserId: invoice.user.id,
      invoiceId: invoice.id,
      invoiceAmount: Number(invoice.amount)
    })
  }

  return NextResponse.json({ success: true })
}
