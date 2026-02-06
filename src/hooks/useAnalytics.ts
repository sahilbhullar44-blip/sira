"use client";

import { useCallback } from 'react';

export const useAnalytics = () => {
    const trackEvent = useCallback(async (type: 'page_view' | 'click' | 'form_submit', action: string, metadata?: Record<string, unknown>) => {
        try {
            // Optional: Check for consent or dev mode before sending
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    action,
                    metadata,
                    // userId can be injected if we have a context for it
                }),
            });
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }, []);

    return { trackEvent };
};
