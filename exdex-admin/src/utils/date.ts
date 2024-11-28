export const convertISOToCustomFormat = (isoDate: any) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}`;
};

export const convertISOToLongDateFormat = (isoDate: string) => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
};

export const convertISOToYYYYMMDD = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const convertISOToYYYYMMDDUTC = (isoDate: string,type:string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day).toISOString();
};

// export const convertISOToYYYYMMDDUTC = (isoDate: string, type: "start" | "end"): string => {
//     const date = new Date(isoDate);
//     const year = date.getUTCFullYear();
//     const month = date.getUTCMonth();
//     const day = date.getUTCDate();

//     if (type === "start") {
//         return new Date(year, month, day).toISOString();
//     } else if (type === "end") {
//         return new Date(Date.UTC(year, month, day, 23, 59, 59, 999)).toISOString();
//     }

//     throw new Error("Invalid type. Use 'start' or 'end'.");
// };


export const extractTimeLabels = (timestamp: string) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    if (minutes >= 30) {
        hours += 1;
    }
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return `${hours}${ampm}`;
};


export const extractMonth = (timestamp: string) => {
    const date = new Date(timestamp);
    const monthIndex = date.getMonth();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = months[monthIndex];

    return month;
};

export const extractWeek = (timestamp: string) => {
    const date = new Date(timestamp);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((date.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);
    return `Week ${weekNumber}`;
};


export const extractDay = (timestamp: string) => {
    const date = new Date(timestamp);
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[monthIndex]} ${day}`;
};

export const extractYear = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    return year.toString();
};


export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} - ${month} - ${day}`;
}

export const dmyToymd = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return `${year} - ${month} - ${day}`;
}