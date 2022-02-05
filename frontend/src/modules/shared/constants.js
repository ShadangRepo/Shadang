import SchoolIcon from '@material-ui/icons/School';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PetsIcon from '@material-ui/icons/Pets';
import FlightIcon from '@material-ui/icons/Flight';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MemoryIcon from '@material-ui/icons/Memory';
import WorkIcon from '@material-ui/icons/Work';
import BrushIcon from '@material-ui/icons/Brush';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LaptopIcon from '@material-ui/icons/Laptop';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import NatureIcon from '@material-ui/icons/Nature';
import SecurityIcon from '@material-ui/icons/Security';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import LandscapeIcon from '@material-ui/icons/Landscape';

const Config = {
    // BASE_URL: "https://us-central1-shadang-63a81.cloudfunctions.net/app"
    BASE_URL: process.env.NODE_ENV === "development" ? "http://localhost:5001/shadang-63a81/us-central1/app" : "https://us-central1-shadang-63a81.cloudfunctions.net/app"
}

const BrandName = "Shadang";

const TokenName = "sec_tok"; //sec_toc stands for secret token
const RefreshTokenName = "sec_ref_tok"; //sec_ref_toc stands for secret refresh token
const TokenExpiredMessage = "Token expired";
const RefreshTokenExpiredMessage = "Refresh token expired";
const NoTokenPresent = "A token is required for authentication";

const ExhibitionCategories = [
    {
        label: "Education",
        Icon: SchoolIcon
    }, {
        label: "Packaging",
        Icon: CardGiftcardIcon
    }, {
        label: "Entertainment",
        Icon: VideocamIcon
    }, {
        label: "Telecommunication",
        Icon: PhoneEnabledIcon
    }, {
        label: "Building",
        Icon: ApartmentIcon
    }, {
        label: "Kids",
        Icon: ChildCareIcon
    }, {
        label: "Food",
        Icon: LocalDiningIcon
    }, {
        label: "Animals",
        Icon: PetsIcon
    }, {
        label: "Agriculture",
        Icon: NatureIcon
    }, {
        label: "Tourism",
        Icon: FlightIcon
    }, {
        label: "Environment",
        Icon: LandscapeIcon
    }, {
        label: "Security",
        Icon: SecurityIcon
    }, {
        label: "Automobile",
        Icon: DirectionsCarIcon
    }, {
        label: "Home",
        Icon: HomeIcon
    }, {
        label: "Office",
        Icon: BusinessIcon
    }, {
        label: "Fassion",
        Icon: ShoppingBasketIcon
    }, {
        label: "Electronics",
        Icon: MemoryIcon
    }, {
        label: "Business",
        Icon: WorkIcon
    }, {
        label: "Art",
        Icon: BrushIcon
    }, {
        label: "Fitness",
        Icon: FitnessCenterIcon
    }, {
        label: "Finance",
        Icon: AttachMoneyIcon
    }, {
        label: "Science",
        Icon: ImportantDevicesIcon
    }, {
        label: "Technology",
        Icon: LaptopIcon
    }, {
        label: "Medical",
        Icon: LocalHospitalIcon
    }
];

const SexConstants = {
    MALE: "male",
    FEMALE: "female"
}

const SexList = [
    {
        label: "Male",
        value: SexConstants.MALE
    },
    {
        label: "Female",
        value: SexConstants.FEMALE
    }
]

const dateFormat1 = "DD/MM/YYYY";
const dateFormat2 = "MM/DD/YYYY";
const dateTimeFormat1 = "DD/MM/YYYY HH:mm:ss";
const dateTimeFormat2 = "MM/DD/YYYY HH:mm:ss";

export {
    Config,
    BrandName,
    TokenName,
    RefreshTokenName,
    TokenExpiredMessage,
    RefreshTokenExpiredMessage,
    NoTokenPresent,
    ExhibitionCategories,
    dateFormat1,
    dateFormat2,
    dateTimeFormat1,
    dateTimeFormat2,
    SexConstants,
    SexList
};