"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  nativeName: string
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  translate: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Comprehensive translations
const translations: Record<string, Record<string, string>> = {
  en: {
    // General
    welcome: "Welcome to Hey Kisan!",
    dashboard: "Dashboard",
    weather: "Weather",
    soil: "Soil Analysis",
    crops: "Crop Management",
    irrigation: "Irrigation",
    marketplace: "Marketplace",
    payments: "Payments",
    profile: "Profile",
    settings: "Settings",
    getStarted: "Get Started",
    users: "Users",
    sensors: "Sensors & Motors",

    // Auth
    login: "Login",
    register: "Register",
    accessAccount: "Access your Hey Kisan account",
    phoneNumber: "Phone Number",
    enterPhone: "Enter your phone number",
    password: "Password",
    enterPassword: "Enter your password",
    forgotPassword: "Forgot Password",
    fullName: "Full Name",
    enterName: "Enter your full name",
    createPassword: "Create a password",
    confirmPassword: "Confirm Password",
    confirmYourPassword: "Confirm your password",
    sendOTP: "Send OTP",
    verifyOTP: "Verify OTP",
    enterOTP: "Enter OTP",
    enterOTPSent: "Enter the OTP sent to your phone",
    enterPhoneForOTP: "Please enter your phone number to receive an OTP",

    // Dashboard
    overview: "Overview",
    todayWeather: "Today's Weather",
    soilStatus: "Soil Status",
    cropStatus: "Crop Status",
    marketPrices: "Market Prices",
    recentActivity: "Recent Activity",
    alerts: "Alerts",

    // Marketplace
    searchProducts: "Search products",
    addToCart: "Add to Cart",
    buyProducts: "Buy Products",
    sellProducts: "Sell Products",
    productDetails: "Product Details",
    price: "Price",
    quantity: "Quantity",
    category: "Category",
    seller: "Seller",

    // Weather
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind",
    precipitation: "Precipitation",
    forecast: "Forecast",

    // Soil
    moisture: "Moisture",
    ph: "pH Level",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",

    // Crop
    cropType: "Crop Type",
    plantingDate: "Planting Date",
    harvestDate: "Harvest Date",
    growthStage: "Growth Stage",
    healthStatus: "Health Status",

    // Payments
    transactionHistory: "Transaction History",
    amount: "Amount",
    date: "Date",
    status: "Status",
    paymentMethod: "Payment Method",

    // Users
    allUsers: "All Users",
    farmers: "Farmers",
    agents: "Agents",
    admins: "Admins",
    active: "Active",
    inactive: "Inactive",

    // Settings
    language: "Language",
    notifications: "Notifications",
    account: "Account",
    privacy: "Privacy",
    help: "Help",
    logout: "Logout",

    // Dashboard components
    dashboardTitle: "Dashboard",
    welcomeBack: "Welcome back",
    lastUpdated: "Last updated",
    currentWeather: "Current Weather",
    partlyCloudy: "Partly Cloudy",
    soilMoisture: "Soil Moisture",
    average: "Average",
    northField: "North Field",
    eastField: "East Field",
    southField: "South Field",
    cropStatus: "Crop Status",
    daysRemaining: "days remaining",
    growthProgress: "Growth Progress",
    waterStatus: "Water Status",
    optimal: "Optimal",
    nextIrrigation: "Next Irrigation",
    tomorrow: "Tomorrow",
    activityOverview: "Activity Overview",
    farmActivities: "Your farm's recent activities and status",
    irrigationCompleted: "Irrigation Completed",
    hoursAgo: "hours ago",
    northFieldIrrigation: "North Field irrigation cycle completed successfully.",
    soilAnalysisResults: "Soil Analysis Results",
    yesterday: "Yesterday",
    eastFieldSoil: "East Field soil analysis shows low nitrogen levels.",
    cropTreatmentApplied: "Crop Treatment Applied",
    daysAgo: "days ago",
    appliedPesticide: "Applied organic pesticide to rice crops in North Field.",
    marketplacePurchase: "Marketplace Purchase",
    purchasedFertilizer: "Purchased 50kg of organic fertilizer for ₹1,200.",
    weatherForecast: "Weather Forecast",
    weatherPrediction: "7-day weather prediction for your location",
    today: "Today",
    alerts: "Alerts",
    importantNotifications: "Important notifications",
    lowSoilMoisture: "Low Soil Moisture",
    irrigationRecommended: "East Field moisture levels below 30%. Irrigation recommended.",
    viewDetails: "View Details",
    fertilizerApplicationDue: "Fertilizer Application Due",
    nitrogenFertilizer: "Rice crops in North Field due for nitrogen fertilizer application.",
    weatherAlert: "Weather Alert",
    rainfallExpected: "Heavy rainfall expected in 3 days. Consider adjusting irrigation schedule.",
    marketPrices: "Market Prices",
    currentCropPrices: "Current crop prices in your area",
    perQuintal: "Per Quintal",
    viewMarketplace: "View Marketplace",
    upcomingTasks: "Upcoming Tasks",
    scheduledActivities: "Scheduled farm activities",
    fertilizerApplication: "Fertilizer Application",
    scheduled: "Scheduled",
    irrigationMaintenance: "Irrigation Maintenance",
    pending: "Pending",
    equipmentService: "Equipment Service",
    all: "All",
    rice: "Rice",
    wheat: "Wheat",
    potatoes: "Potatoes",
    onions: "Onions",
    refresh: "Refresh",
    refreshing: "Refreshing...",
    loadingDashboard: "Loading dashboard...",
    justNow: "Just now",
    minutesAgo: "min ago",
    hoursSingular: "hour ago",
    hoursPlural: "hours ago",
    daysSingular: "day ago",
    daysPlural: "days ago",
    irrigationSystemMaintenance: "Irrigation System Maintenance",
    performedMaintenance: "Performed routine maintenance on irrigation system.",
    sunny: "Sunny",
    cloudy: "Cloudy",
    rainy: "Rainy",
    partlycloudy: "Partly Cloudy",
    myAccount: "My Account",
    logout: "Log out",
  },
  hi: {
    // General
    welcome: "हे किसान में आपका स्वागत है!",
    dashboard: "डैशबोर्ड",
    weather: "मौसम",
    soil: "मिट्टी विश्लेषण",
    crops: "फसल प्रबंधन",
    irrigation: "सिंचाई",
    marketplace: "बाज़ार",
    payments: "भुगतान",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    getStarted: "शुरू करें",
    users: "उपयोगकर्ता",
    sensors: "सेंसर और मोटर",

    // Auth
    login: "लॉगिन",
    register: "रजिस्टर",
    accessAccount: "अपने हे किसान खाते तक पहुंचें",
    phoneNumber: "फोन नंबर",
    enterPhone: "अपना फोन नंबर दर्ज करें",
    password: "पासवर्ड",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    forgotPassword: "पासवर्ड भूल गए",
    fullName: "पूरा नाम",
    enterName: "अपना पूरा नाम दर्ज करें",
    createPassword: "पासवर्ड बनाएं",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    confirmYourPassword: "अपने पासवर्ड की पुष्टि करें",
    sendOTP: "OTP भेजें",
    verifyOTP: "OTP सत्यापित करें",
    enterOTP: "OTP दर्ज करें",
    enterOTPSent: "आपके फोन पर भेजा गया OTP दर्ज करें",
    enterPhoneForOTP: "OTP प्राप्त करने के लिए कृपया अपना फोन नंबर दर्ज करें",

    // Dashboard
    overview: "अवलोकन",
    todayWeather: "आज का मौसम",
    soilStatus: "मिट्टी की स्थिति",
    cropStatus: "फसल की स्थिति",
    marketPrices: "बाजार मूल्य",
    recentActivity: "हाल की गतिविधि",
    alerts: "अलर्ट",

    // Marketplace
    searchProducts: "उत्पाद खोजें",
    addToCart: "कार्ट में जोड़ें",
    buyProducts: "उत्पाद खरीदें",
    sellProducts: "उत्पाद बेचें",
    productDetails: "उत्पाद विवरण",
    price: "कीमत",
    quantity: "मात्रा",
    category: "श्रेणी",
    seller: "विक्रेता",

    // Weather
    temperature: "तापमान",
    humidity: "आर्द्रता",
    wind: "हवा",
    precipitation: "वर्षा",
    forecast: "पूर्वानुमान",

    // Soil
    moisture: "नमी",
    ph: "पीएच स्तर",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटेशियम",

    // Crop
    cropType: "फसल प्रकार",
    plantingDate: "रोपण तिथि",
    harvestDate: "कटाई तिथि",
    growthStage: "विकास चरण",
    healthStatus: "स्वास्थ्य स्थिति",

    // Payments
    transactionHistory: "लेनदेन इतिहास",
    amount: "राशि",
    date: "तारीख",
    status: "स्थिति",
    paymentMethod: "भुगतान विधि",

    // Users
    allUsers: "सभी उपयोगकर्ता",
    farmers: "किसान",
    agents: "एजेंट",
    admins: "व्यवस्थापक",
    active: "सक्रिय",
    inactive: "निष्क्रिय",

    // Settings
    language: "भाषा",
    notifications: "सूचनाएं",
    account: "खाता",
    privacy: "गोपनीयता",
    help: "सहायता",
    logout: "लॉगआउट",

    // Dashboard components
    dashboardTitle: "डैशबोर्ड",
    welcomeBack: "वापसी पर स्वागत है",
    lastUpdated: "अंतिम अपडेट",
    currentWeather: "वर्तमान मौसम",
    partlyCloudy: "आंशिक रूप से बादल",
    soilMoisture: "मिट्टी की नमी",
    average: "औसत",
    northField: "उत्तरी खेत",
    eastField: "पूर्वी खेत",
    southField: "दक्षिणी खेत",
    cropStatus: "फसल की स्थिति",
    daysRemaining: "दिन शेष",
    growthProgress: "विकास प्रगति",
    waterStatus: "पानी की स्थिति",
    optimal: "अनुकूलतम",
    nextIrrigation: "अगली सिंचाई",
    tomorrow: "कल",
    activityOverview: "गतिविधि अवलोकन",
    farmActivities: "आपके खेत की हालिया गतिविधियां और स्थिति",
    irrigationCompleted: "सिंचाई पूरी हुई",
    hoursAgo: "घंटे पहले",
    northFieldIrrigation: "उत्तरी खेत सिंचाई चक्र सफलतापूर्वक पूरा हुआ।",
    soilAnalysisResults: "मिट्टी विश्लेषण परिणाम",
    yesterday: "कल",
    eastFieldSoil: "पूर्वी खेत में नाइट्रोजन का स्तर कम है।",
    cropTreatmentApplied: "फसल उपचार लागू किया गया",
    daysAgo: "दिन पहले",
    appliedPesticide: "उत्तरी खेत में चावल की फसलों पर जैविक कीटनाशक लागू किया गया।",
    marketplacePurchase: "बाज़ार खरीदारी",
    purchasedFertilizer: "₹1,200 में 50 किलो जैविक उर्वरक खरीदा गया।",
    weatherForecast: "मौसम का पूर्वानुमान",
    weatherPrediction: "आपके स्थान के लिए 7-दिन का मौसम पूर्वानुमान",
    today: "आज",
    alerts: "अलर्ट",
    importantNotifications: "महत्वपूर्ण सूचनाएं",
    lowSoilMoisture: "कम मिट्टी की नमी",
    irrigationRecommended: "पूर्वी खेत की नमी का स्तर 30% से कम है। सिंचाई की सिफारिश की जाती है।",
    viewDetails: "विवरण देखें",
    fertilizerApplicationDue: "उर्वरक आवेदन देय",
    nitrogenFertilizer: "उत्तरी खेत में चावल की फसलों के लिए नाइट्रोजन उर्वरक आवेदन देय है।",
    weatherAlert: "मौसम अलर्ट",
    rainfallExpected: "3 दिनों में भारी वर्षा की उम्मीद है। सिंचाई कार्यक्रम समायोजित करने पर विचार करें।",
    marketPrices: "बाजार मूल्य",
    currentCropPrices: "आपके क्षेत्र में वर्तमान फसल मूल्य",
    perQuintal: "प्रति क्विंटल",
    viewMarketplace: "बाज़ार देखें",
    upcomingTasks: "आगामी कार्य",
    scheduledActivities: "निर्धारित कृषि गतिविधियां",
    fertilizerApplication: "उर्वरक आवेदन",
    scheduled: "निर्धारित",
    irrigationMaintenance: "सिंचाई रखरखाव",
    pending: "लंबित",
    equipmentService: "उपकरण सेवा",
    all: "सभी",
    rice: "चावल",
    wheat: "गेहूं",
    potatoes: "आलू",
    onions: "प्याज",
    refresh: "रीफ्रेश",
    refreshing: "रीफ्रेश हो रहा है...",
    loadingDashboard: "डैशबोर्ड लोड हो रहा है...",
    justNow: "अभी अभी",
    minutesAgo: "मिनट पहले",
    hoursSingular: "घंटा पहले",
    hoursPlural: "घंटे पहले",
    daysSingular: "दिन पहले",
    daysPlural: "दिन पहले",
    irrigationSystemMaintenance: "सिंचाई प्रणाली रखरखाव",
    performedMaintenance: "सिंचाई प्रणाली पर नियमित रखरखाव किया गया।",
    sunny: "धूप",
    cloudy: "बादल",
    rainy: "बारिश",
    partlycloudy: "आंशिक रूप से बादल",
    myAccount: "मेरा खाता",
    logout: "लॉग आउट",
  },
  te: {
    // General
    welcome: "హే కిసాన్‌కి స్వాగతం!",
    dashboard: "డాష్‌బోర్డ్",
    weather: "వాతావరణం",
    soil: "నేల విశ్లేషణ",
    crops: "పంట నిర్వహణ",
    irrigation: "నీటిపారుదల",
    marketplace: "మార్కెట్‌ప్లేస్",
    payments: "చెల్లింపులు",
    profile: "ప్రొఫైల్",
    settings: "సెట్టింగ్‌లు",
    getStarted: "ప్రారంభించండి",
    users: "వినియోగదారులు",
    sensors: "సెన్సార్లు & మోటార్లు",

    // Auth
    login: "లాగిన్",
    register: "నమోదు",
    accessAccount: "మీ హే కిసాన్ ఖాతాను యాక్సెస్ చేయండి",
    phoneNumber: "ఫోన్ నంబర్",
    enterPhone: "మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
    password: "పాస్‌వర్డ్",
    enterPassword: "మీ పాస్‌వర్డ్‌ను నమోదు చేయండి",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా",
    fullName: "పూర్తి పేరు",
    enterName: "మీ పూర్తి పేరును నమోదు చేయండి",
    createPassword: "పాస్‌వర్డ్‌ను సృష్టించండి",
    confirmPassword: "పాస్‌వర్డ్‌ని నిర్ధారించండి",
    confirmYourPassword: "మీ పాస్‌వర్డ్‌ని నిర్ధారించండి",
    sendOTP: "OTP పంపండి",
    verifyOTP: "OTPని ధృవీకరించండి",
    enterOTP: "OTPని నమోదు చేయండి",
    enterOTPSent: "మీ ఫోన్‌కి పంపిన OTPని నమోదు చేయండి",
    enterPhoneForOTP: "OTP స్వీకరించడానికి దయచేసి మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",

    // Dashboard
    overview: "అవలోకనం",
    todayWeather: "నేటి వాతావరణం",
    soilStatus: "నేల స్థితి",
    cropStatus: "పంట స్థితి",
    marketPrices: "మార్కెట్ ధరలు",
    recentActivity: "ఇటీవలి కార్యాచరణ",
    alerts: "హెచ్చరికలు",

    // Marketplace
    searchProducts: "ఉత్పత్తులను శోధించండి",
    addToCart: "కార్ట్‌కి జోడించండి",
    buyProducts: "ఉత్పత్తులను కొనుగోలు చేయండి",
    sellProducts: "ఉత్పత్తులను విక్రయించండి",
    productDetails: "ఉత్పత్తి వివరాలు",
    price: "ధర",
    quantity: "పరిమాణం",
    category: "వర్గం",
    seller: "విక్రేత",

    // Weather
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    wind: "గాలి",
    precipitation: "వర్షపాతం",
    forecast: "ముందస్తు అంచనా",

    // Soil
    moisture: "తేమ",
    ph: "pH స్థాయి",
    nitrogen: "నైట్రోజన్",
    phosphorus: "ఫాస్ఫరస్",
    potassium: "పొటాషియం",

    // Crop
    cropType: "పంట రకం",
    plantingDate: "నాటడం తేదీ",
    harvestDate: "పంట కోత తేదీ",
    growthStage: "వృద్ధి దశ",
    healthStatus: "ఆరోగ్య స్థితి",

    // Payments
    transactionHistory: "లావాదేవీల చరిత్ర",
    amount: "మొత్తం",
    date: "తేదీ",
    status: "స్థితి",
    paymentMethod: "చెల్లింపు పద్ధతి",

    // Users
    allUsers: "అందరు వినియోగదారులు",
    farmers: "రైతుల",
    agents: "ఏజెంట్లు",
    admins: "నిర్వాహకులు",
    active: "క్రియాశీల",
    inactive: "నిష్క్రియాత్మక",

    // Settings
    language: "భాష",
    notifications: "నోటిఫికేషన్లు",
    account: "ఖాతా",
    privacy: "గోప్యత",
    help: "సహాయం",
    logout: "లాగ్అవుట్",

    // Dashboard components
    dashboardTitle: "డాష్‌బోర్డ్",
    welcomeBack: "తిరిగి స్వాగతం",
    lastUpdated: "చివరిగా నవీకరించబడింది",
    currentWeather: "ప్రస్తుత వాతావరణం",
    partlyCloudy: "పాక్షికంగా మేఘావృతం",
    soilMoisture: "నేల తేమ",
    average: "సగటు",
    northField: "ఉత్తర పొలం",
    eastField: "తూర్పు పొలం",
    southField: "దక్షిణ పొలం",
    cropStatus: "పంట స్థితి",
    daysRemaining: "రోజులు మిగిలి ఉన్నాయి",
    growthProgress: "వృద్ధి ప్రగతి",
    waterStatus: "నీటి స్థితి",
    optimal: "అనుకూలమైన",
    nextIrrigation: "తదుపరి నీటిపారుదల",
    tomorrow: "రేపు",
    activityOverview: "కార్యాచరణ అవలోకనం",
    farmActivities: "మీ పొలం యొక్క ఇటీవలి కార్యకలాపాలు మరియు స్థితి",
    irrigationCompleted: "నీటిపారుదల పూర్తయింది",
    hoursAgo: "గంటల క్రితం",
    northFieldIrrigation: "ఉత్తర పొలం నీటిపారుదల చక్రం విజయవంతంగా పూర్తయింది.",
    soilAnalysisResults: "నేల విశ్లేషణ ఫలితాలు",
    yesterday: "నిన్న",
    eastFieldSoil: "తూర్పు పొలం నేల విశ్లేషణ తక్కువ నైట్రోజన్ స్థాయిలను చూపిస్తుంది.",
    cropTreatmentApplied: "పంట చికిత్స వర్తించబడింది",
    daysAgo: "రోజుల క్రితం",
    appliedPesticide: "ఉత్తర పొలంలో వరి పంటలకు సేంద్రీయ పురుగుమందు వర్తించబడింది.",
    marketplacePurchase: "మార్కెట్‌ప్లేస్ కొనుగోలు",
    purchasedFertilizer: "₹1,200కి 50 కిలోల సేంద్రీయ ఎరువు కొనుగోలు చేయబడింది.",
    weatherForecast: "వాతావరణ సూచన",
    weatherPrediction: "మీ ప్రాంతానికి 7-రోజుల వాతావరణ అంచనా",
    today: "ఈరోజు",
    alerts: "హెచ్చరికలు",
    importantNotifications: "ముఖ్యమైన నోటిఫికేషన్లు",
    lowSoilMoisture: "తక్కువ నేల తేమ",
    irrigationRecommended: "తూర్పు పొలం తేమ స్థాయిలు 30% కంటే తక్కువగా ఉన్నాయి. నీటిపారుదల సిఫార్సు చేయబడింది.",
    viewDetails: "వివరాలను చూడండి",
    fertilizerApplicationDue: "ఎరువు అప్లికేషన్ గడువు",
    nitrogenFertilizer: "ఉత్తర పొలంలో వరి పంటలకు నైట్రోజన్ ఎరువు అప్లికేషన్ గడువు.",
    weatherAlert: "వాతావరణ హెచ్చరిక",
    rainfallExpected: "3 రోజుల్లో భారీ వర్షం పడే అవకాశం ఉంది. నీటిపారుదల షెడ్యూల్‌ను సర్దుబాటు చేయడాన్ని పరిగణించండి.",
    marketPrices: "మార్కెట్ ధరలు",
    currentCropPrices: "మీ ప్రాంతంలో ప్రస్తుత పంట ధరలు",
    perQuintal: "క్వింటాల్ కి",
    viewMarketplace: "మార్కెట్‌ప్లేస్‌ని చూడండి",
    upcomingTasks: "రాబోయే పనులు",
    scheduledActivities: "షెడ్యూల్ చేయబడిన వ్యవసాయ కార్యకలాపాలు",
    fertilizerApplication: "ఎరువు అప్లికేషన్",
    scheduled: "షెడ్యూల్ చేయబడింది",
    irrigationMaintenance: "నీటిపారుదల నిర్వహణ",
    pending: "పెండింగ్‌లో ఉంది",
    equipmentService: "పరికరాల సర్వీస్",
    all: "అన్నీ",
    rice: "వరి",
    wheat: "గోధుమ",
    potatoes: "బంగాళాదుంపలు",
    onions: "ఉల్లిపాయలు",
    refresh: "రిఫ్రెష్",
    refreshing: "రిఫ్రెష్ అవుతోంది...",
    loadingDashboard: "డాష్‌బోర్డ్ లోడ్ అవుతోంది...",
    justNow: "ఇప్పుడే",
    minutesAgo: "నిమిషాల క్రితం",
    hoursSingular: "గంట క్రితం",
    hoursPlural: "గంటల క్రితం",
    daysSingular: "రోజు క్రితం",
    daysPlural: "రోజుల క్రితం",
    irrigationSystemMaintenance: "నీటిపారుదల వ్యవస్థ నిర్వహణ",
    performedMaintenance: "నీటిపారుదల వ్యవస్థపై నియమిత నిర్వహణ నిర్వహించబడింది.",
    sunny: "ఎండగా ఉంది",
    cloudy: "మేఘావృతం",
    rainy: "వర్షం",
    partlycloudy: "పాక్షికంగా మేఘావృతం",
    myAccount: "నా ఖాతా",
    logout: "లాగ్ అవుట్",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const language = languages.find((lang) => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("language", language.code)

    // If using speech synthesis, update the language there too
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance()
      msg.lang = language.code === "en" ? "en-US" : language.code === "hi" ? "hi-IN" : "te-IN"
    }
  }

  const translate = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
