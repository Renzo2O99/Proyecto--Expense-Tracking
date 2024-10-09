export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function formatDate(dateString: string): string {
    const dateObj = new Date(dateString);
    const optionsFormat: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
    };

    const formattedDate = dateObj.toLocaleDateString('es-ES', optionsFormat);

    // Capitalizar solo la primera letra del resultado
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}
