export { };

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lenis?: any; // Using any for Lenis to avoid complex type importing issues for now, or I can try to find the type.
        openModal?: (context: "Contact" | "Tickets", data?: { ticketUrl?: string; eventTitle?: string }) => void;
    }
}
