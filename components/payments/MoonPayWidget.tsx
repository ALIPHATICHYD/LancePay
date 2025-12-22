'use client'

import { useEffect, useCallback } from 'react'

interface MoonPayWidgetProps {
  walletAddress: string
  amount: number
  currencyCode?: string
  onSuccess?: () => void
  onClose?: () => void
}

export function useMoonPayWidget() {
  const openWidget = useCallback(async ({
    walletAddress,
    amount,
    currencyCode = 'usdc_base',
    onSuccess,
    onClose
  }: MoonPayWidgetProps) => {
    // Dynamically import MoonPay SDK (client-side only)
    const { loadMoonPay } = await import('@moonpay/moonpay-js')
    
    const moonPay = await loadMoonPay()
    const moonPaySdk = moonPay({
      flow: 'buy',
      environment: 'sandbox', // Change to 'production' when going live
      variant: 'overlay',
      params: {
        apiKey: process.env.NEXT_PUBLIC_MOONPAY_API_KEY!,
        theme: 'dark',
        baseCurrencyCode: 'usd',
        baseCurrencyAmount: String(amount),
        defaultCurrencyCode: currencyCode,
        walletAddress: walletAddress,
        showWalletAddressForm: false,
      },
    })

    // Handle widget events
    moonPaySdk.on('transactionCompleted', () => {
      onSuccess?.()
    })

    moonPaySdk.on('close', () => {
      onClose?.()
    })

    // Show the widget
    moonPaySdk.show()

    return moonPaySdk
  }, [])

  return { openWidget }
}
