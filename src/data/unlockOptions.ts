interface ServiceOption {
    value: string;
    text: string;
    price: number | "free";
}

interface OptionGroup {
    label: string;
    options: ServiceOption[];
}

export const unlockOptions: (ServiceOption | OptionGroup)[] = [
    { value: "0", text: "PLEASE CHOOSE UNLOCK SERVICE", price: "free" },
    {
        label: "IPHONE UNLOCK SERVICES",
        options: [
            { value: "137", text: "AUSTRIA A1 MOBILKOM - PREMIUM 🕒", price: 165.0 },
            { value: "138", text: "AUSTRIA A1 MOBILKOM - OUT OF CONTRACT 🕒", price: 115.0 },
            { value: "96", text: "CANADA FIDO/ROGERS - CLEAN 🕒", price: 5.00 },
            { value: "95", text: "CANADA TELUS - CLEAN 🕒", price: 2.00 },
            { value: "132", text: "CLARO ALL COUNTRIES - PREMIUM (iPHONE 14) 🕒", price: 59.0 },
            { value: "142", text: "CLARO ALL COUNTRIES - PREMIUM (iPHONE 15) 🕒", price: 89.0 },
            { value: "135", text: "CLARO ALL COUNTRIES - PREMIUM (UP TO iPHONE 13) 🕒", price: 47.0 },
            { value: "113", text: "EMEA SERVICE - PREMIUM 🕒", price: 1.50 },
            { value: "99", text: "HUNGARY VODAFONE - PREMIUM (iPHONE 12 TO 14) 🕒", price: 132.0 },
            { value: "83", text: "HUNGARY VODAFONE - PREMIUM (iPHONE 4S TO 11) 🕒", price: 66.0 },
            { value: "126", text: "JAPAN AU KDDI - CLEAN 🕒", price: 4.00 },
            { value: "116", text: "JAPAN NTT DOCOMO - CLEAN 🕒", price: 2.60 },
            { value: "52", text: "JAPAN SOFTBANK - CLEAN 🕒", price: 2.60 },
            { value: "50", text: "PHILIPPINES GLOBE - CLEAN 🕒", price: 6.00 },
            { value: "69", text: "ROMANIA ORANGE - PREMIUM 🕒", price: 14.0 },
            { value: "71", text: "ROMANIA VODAFONE - PREMIUM 🕒", price: 18.0 },
            { value: "97", text: "UK EE/T-MOBILE/ORANGE - PREMIUM 🕒", price: 2.00 },
            { value: "98", text: "UK O2 TESCO - CLEAN 🕒", price: 3.00 },
            { value: "127", text: "UK VODAFONE - CLEAN 🕒", price: 8.00 },
            { value: "129", text: "US RESELLER FLEX - CLEAN 🕒", price: 12.0 },
            { value: "51", text: "USA AT&T - CLEAN/ACTIVE LINE 🕒", price: 8.00 },
            { value: "234", text: "USA AT&T - SOLD DATE: 60 DAYS 🕒", price: 28.0 },
            { value: "53", text: "USA CRICKET - CLEAN & 6 MONTHS OLD 🕒", price: 6.00 },
            { value: "141", text: "USA T-MOBILE - CLEAN 🕒", price: 5.00 }
        ]
    }
];

const unlockOptionsId = [
    '137', '138',
    '96', '95',
    '132', '142',
    '135', '113',
    '99', '83',
    '126', '116',
    '52', '50',
    '69', '71',
    '97', '98',
    '127', '129',
    '51', '234',
    '53', '141',
    '57', '107',
    '114', '104',
    '119', '115',
    '127', '52',
    '140', '116',
    '125', '96',
    '134', '53',
    '130', '136'
];