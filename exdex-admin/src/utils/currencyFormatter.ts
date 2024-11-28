// export const formatCurrency = (value: any, locale: string = 'en-US', currency?: string): string => {
//     if (typeof Intl === 'undefined') {
//         return currency ? `${currency} ${value}` : value.toLocaleString(locale);
//     }

//     const options: Intl.NumberFormatOptions = currency ? { style: 'currency', currency: currency } : {};

//     return new Intl.NumberFormat(locale, options).format(value);
// };
export const formatCurrency = (
    value: number,
    locale: string = 'en-US',
    currency?: string,
): string => {
    if (typeof Intl === 'undefined') {
        return formatLargeNumber(value, currency, locale);
    }

    if (value > 9999) {
        return formatLargeNumber(value, currency, locale);
    }

    const hasDecimals = value % 1 !== 0;

    const options: Intl.NumberFormatOptions = currency
        ? {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: hasDecimals ? 2 : 0,
        }
        : {
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: hasDecimals ? 2 : 0,
        };

    return new Intl.NumberFormat(locale, options).format(value);
};

const formatLargeNumber = (value: number, currency?: string, locale: string = 'en-US'): string => {
    const absValue = Math.abs(value);
    let formattedValue: string;
    let suffix: string = '';

    if (absValue >= 1e9) {
        formattedValue = (value / 1e9).toFixed(1);
        suffix = 'B';
    } else if (absValue >= 1e6) {
        formattedValue = (value / 1e6).toFixed(1);
        suffix = 'M';
    } else if (absValue >= 1e3) {
        formattedValue = (value / 1e3).toFixed(1);
        suffix = 'k';
    } else {
        formattedValue = value.toFixed(value % 1 !== 0 ? 2 : 0);
    }

    // Remove trailing .0 if present
    formattedValue = formattedValue.replace(/\.0$/, '');

    if (currency) {
        // Use the currency symbol as per the locale
        const currencySymbol = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        })
            .formatToParts(0)
            .find(part => part.type === 'currency')?.value;

        return `${currencySymbol}${formattedValue}${suffix}`;
    }
    return `${formattedValue}${suffix}`;
};

