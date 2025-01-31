interface ServiceOption {
    value: string;
    text: string;
    price: number | "free";
}

interface OptionGroup {
    label: string;
    options: ServiceOption[];
}

export const checkerOptions: (ServiceOption | OptionGroup)[] = [
    { value: "0", text: "PLEASE CHOOSE CHECKER", price: "free" },
    {
        label: "APPLE SERVICES", options: [
            { value: "105", text: "APPLE SOLD BY & COVERAGE ⚡", price: 1.80 },
            { value: "68", text: "APPLE GSX CASES & REPAIRS ⚡", price: 1.60 },
            { value: "76", text: "APPLE GSX CASES ID INFO ⚡", price: 1.60 },
            { value: "62", text: "APPLE iOS VERSION & NEXT TETHER ⚡", price: 0.80 },
            { value: "67", text: "APPLE GSX POLICY & Wi-Fi MAC ⚡", price: 1.40 },
            { value: "63", text: "APPLE FULL GSX - PREMIUM INFO ⚡", price: 2.00 },
            { value: "219", text: "APPLE PART NUMBER - MPN ⚡", price: 0.15 },
            { value: "103", text: "iPHONE CARRIER - SIMPLE ⚡", price: "free" },
            { value: "61", text: "iPHONE CARRIER - FMI & BLACKLIST ⚡", price: 0.12 },
            { value: "78", text: "iPHONE CARRIER - FMI ⚡", price: 0.08 },
            { value: "8", text: "iPHONE SIM-LOCK ⚡", price: "free" },
            { value: "12", text: "IMEI ⇄ SN CONVERT ⚡", price: 0.025 },
            { value: "30", text: "APPLE BASIC INFO ⚡", price: "free" },
            { value: "26", text: "APPLE SERIAL INFO ⚡", price: "free" },
            { value: "3", text: "iCLOUD ON/OFF ⚡", price: "free" },
            { value: "4", text: "iCLOUD CLEAN/LOST ⚡", price: 0.03 },
            { value: "10", text: "APPLE ACTIVATION STATUS - IMEI/SN ⚡", price: "free" },
            { value: "81", text: "APPLE MDM STATUS ⚡", price: 1.00 },
            { value: "72", text: "APPLE MDM & iCLOUD & GSX STATUS ⚡", price: 1.20 },
            { value: "110", text: "MACBOOK & iMAC iCLOUD ON/OFF STATUS ⚡", price: 0.20 },
            { value: "66", text: "MACBOOK & iMAC iCLOUD CLEAN/LOST STATUS ⚡", price: 0.30 }
        ]
    },
    {
        label: "STATUS SERVICES", options: [
            { value: "65", text: "USA AT&T UNLOCK & STATUS 🕒", price: 0.40 },
            { value: "6", text: "WW BLACKLIST STATUS - PRO ⚡", price: 0.09 },
            { value: "54", text: "WW BLACKLIST STATUS ⚡", price: 0.04 },
            { value: "230", text: "XFINITY USA STATUS - PRO ⚡", price: 0.08 },
            { value: "220", text: "TRACFONE USA STATUS - PRO ⚡", price: 0.06 },
            { value: "231", text: "CSPIRE USA STATUS - PRO ⚡", price: 0.08 },
            { value: "232", text: "MYMOBILE USA STATUS - PRO ⚡", price: 0.03 },
            { value: "21", text: "CRICKET USA STATUS - PRO ⚡", price: 0.15 },
            { value: "16", text: "T-MOBILE USA STATUS - PRO ⚡", price: 0.05 },
            { value: "25", text: "T-MOBILE USA SIMLOCK STATUS ⚡", price: 0.12 },
            { value: "9", text: "VERIZON USA STATUS - PRO ⚡", price: "free" },
            { value: "20", text: "KOREA BLACKLIST STATUS ⚡", price: "free" },
            { value: "32", text: "JAPAN BLACKLIST STATUS ⚡", price: "free" },
            { value: "31", text: "AUSTRALIA BLACKLIST STATUS ⚡", price: "free" }
        ]
    },
    {
        label: "GENERIC SERVICES", options: [
            { value: "19", text: "LG INFO ⚡", price: "free" },
            { value: "55", text: "ZTE INFO ⚡", price: "free" },
            { value: "34", text: "ASUS INFO ⚡", price: "free" },
            { value: "39", text: "OPPO INFO ⚡", price: "free" },
            { value: "23", text: "ACER INFO ⚡", price: "free" },
            { value: "73", text: "HONOR INFO ⚡", price: "free" },
            { value: "56", text: "DOOGEE INFO ⚡", price: "free" },
            { value: "84", text: "REALME INFO ⚡", price: "free" },
            { value: "15", text: "HUAWEI INFO ⚡", price: "free" },
            { value: "22", text: "LENOVO INFO ⚡", price: "free" },
            { value: "36", text: "ONEPLUS INFO ⚡", price: "free" },
            { value: "43", text: "KYOCERA INFO ⚡", price: "free" },
            { value: "17", text: "ALCATEL INFO ⚡", price: "free" },
            { value: "13", text: "MOTOROLA INFO ⚡", price: "free" },
            { value: "75", text: "VIVO & IQOO INFO ⚡", price: "free" },
            { value: "42", text: "GOOGLE PIXEL INFO ⚡", price: "free" },
            { value: "80", text: "SAMSUNG INFO ⚡", price: "free" },
            { value: "233", text: "NOTHING PHONE INFO ⚡", price: 0.03 },
            { value: "1", text: "SAMSUNG INFO - PRO ⚡", price: 0.10 },
            { value: "203", text: "BRAND & MODEL INFO ⚡", price: "free" },
            { value: "37", text: "SIM ICCID/IMSI INFO ⚡", price: "free" },
            { value: "206", text: "XIAOMI MI LOCK & INFO ⚡", price: 0.10 },
            { value: "58", text: "XIAOMI MI LOCK STATUS ⚡", price: 0.50 },
            { value: "82", text: "SAMSUNG KNOX GUARD INFO ⚡", price: 0.30 },
            { value: "45", text: "ITEL | TECNO | SONIM INFO ⚡", price: "free" }
        ]
    },
    {
        label: "PREMIUM SERVICES", options: [
            { value: "94", text: "MDM LOCK BYPASS - iPHONE/iPAD ⚡", price: 17.0 },
            { value: "1002", text: "XIAOMI MI ACCOUNT REMOVE - EUROPE ⚡", price: 7.0 }
        ]
    },
    {
        label: "iPHONE UNLOCK SERVICES", options: [
            { value: "137", text: "AUSTRIA A1 MOBILKOM - PREMIUM 🕒", price: 44.0 },
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
            { value: "1220", text: "USA AT&T - SOLD DATE: 60 DAYS 🕒", price: 28.0 },
            { value: "53", text: "USA CRICKET - CLEAN & 6 MONTHS OLD 🕒", price: 6.00 },
            { value: "141", text: "USA T-MOBILE - CLEAN 🕒", price: 8.00 }
        ]
    },
    {
        label: "GENERIC UNLOCK SERVICES", options: [
            { value: "140", text: "CANADA BELL - NCK CODE 🕒", price: 2.00 },
            { value: "96", text: "CANADA FIDO/ROGERS - CLEAN 🕒", price: 5.00 },
            { value: "104", text: "CANADA VIDEOTRON ⚡", price: 1.00 },
            { value: "107", text: "FRANCE BOUYGUES 🕒", price: 2.00 },
            { value: "115", text: "HTC INTERNATIONAL 🕒", price: 2.00 },
            { value: "116", text: "JAPAN NTT DOCOMO - CLEAN 🕒", price: 2.60 },
            { value: "52", text: "JAPAN SOFTBANK - CLEAN 🕒", price: 2.60 },
            { value: "114", text: "LG 2019 DATABASE 🕒", price: 7.00 },
            { value: "119", text: "LG 2020 DATABASE 🕒", price: 15.00 },
            { value: "136", text: "SAMSUNG AT&T/CRICKET... ALL MODELS 🕒", price: 65.0 },
            { value: "130", text: "SAMSUNG EUROPE - LIMITED COUNTRIES 🕒", price: 14.0 },
            { value: "125", text: "SAMSUNG EUROPE - PREMIUM 🕒", price: 18.0 },
            { value: "134", text: "SAMSUNG UK & IRELAND - PREMIUM 🕒", price: 18.0 },
            { value: "57", text: "UK O2 - CLEAN 🕒", price: 3.00 },
            { value: "127", text: "UK VODAFONE - CLEAN 🕒", price: 8.00 },
            { value: "53", text: "USA CRICKET - CLEAN & 6 MONTHS OLD 🕒", price: 6.00 }
        ]
    }
];

export const formatOptionLabel = (option: ServiceOption): string => {
    const price = option.price === "free"
        ? "FREE"
        : `${option.price.toFixed(2)}$`;
    return `${price} - ${option.text}`;
};

export { unlockOptions } from './unlockOptions';