import React from "react";

// Root Include
const Root = React.lazy(() => import("./pages/Home/indexRoot"));

//Main Index
const Main = React.lazy(() => import("./pages/Home/indexMain"));


;
const PageError = React.lazy(() => import("./pages/Pages/Special/PageError"));
const PageThankYou = React.lazy(() =>
  import("./pages/Pages/Special/PageThankYou")
);


//Auth Pages
const PageLogin = React.lazy(() => import("./pages/Pages/AuthPages/PageLogin"));
const PageCoverLogin = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageCoverLogin")
);
const PageLoginThree = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageLoginThree")
);

const PageSignup = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageSignup")
);
const PageCoverSignup = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageCoverSignup")
);
const PageSignupThree = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageSignupThree")
);

const PageCoverRePassword = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageCoverRePassword")
);
const PageRecoveryPassword = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageRecoveryPassword")
);
const PageRePasswordThree = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageRePasswordThree")
);
const VerifyingCode = React.lazy(() =>
  import("./pages/Pages/AuthPages/VerifyingCode")
);
const ResetPassword = React.lazy(() =>
  import("./pages/Pages/AuthPages/ResetPassword")
);

const Payments = React.lazy(() => import("./pages/Payments/index"));
const SingleProduct = React.lazy(() => import("./pages/SingleProduct/index"));
const Shop = React.lazy(() => import("./pages/Shop/index"));


const PageAboutUs = React.lazy(() => import("./pages/Pages/PageAboutUs"));

const PageHistory = React.lazy(() => import("./pages/Pages/PageHistory"));
const PageMembers = React.lazy(() =>
  import("./pages/Pages/Account/PageMembers")
);
const PageWorks = React.lazy(() => import("./pages/Pages/Account/PageWorks"));
const PageMessages = React.lazy(() =>
  import("./pages/Pages/Account/PageMessages")
);
const PagePricing = React.lazy(() => import("./pages/Pages/PagePricing"));
const PageServices = React.lazy(() => import("./pages/Pages/PageServices"));
const PageTeam = React.lazy(() => import("./pages/Pages/PageTeam"));

//Account
const PageProfile = React.lazy(() =>
  import("./pages/Pages/Account/PageProfile")
);
const PageProfileEdit = React.lazy(() =>
  import("./pages/Pages/Account/PageProfileEdit")
);
const PagePayments = React.lazy(() =>
  import("./pages/Pages/Account/PagePayments")
);
const PageInvoice = React.lazy(() =>
  import("./pages/Pages/Account/PageInvoice")
);

//Career
const PageJobsSidebar = React.lazy(() =>
  import("./pages/Pages/Careers/PageJobsSidebar")
);
const PageCompanyList = React.lazy(() =>
  import("./pages/Pages/Careers/PageCompanyList")
);
const PageCandidateList = React.lazy(() =>
  import("./pages/Pages/Careers/PageCandidateList")
);
const PageJobDetail = React.lazy(() =>
  import("./pages/Pages/Careers/PageJobDetail")
);
const PageJob = React.lazy(() => import("./pages/Pages/Careers/PageJob"));
const PageJobApply = React.lazy(() =>
  import("./pages/Pages/Careers/PageJobApply")
);
const PageJobCompany = React.lazy(() =>
  import("./pages/Pages/Careers/PageJobCompany")
);
const PageJobCandidate = React.lazy(() =>
  import("./pages/Pages/Careers/PageJobCandidate")
);

//Blog
const PageBlog = React.lazy(() => import("./pages/Pages/Blog/PageBlog"));
const PageBlogDetail = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogDetail")
);
const PageBlogDetailTwo = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogDetailTwo")
);
const PageBlogSidebar = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogSidebar")
);
const PageBlogList = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogList")
);
const PageBlogListSidebar = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogListSidebar")
);

//Work
const PageWorkModern = React.lazy(() =>
  import("./pages/Pages/Work/PageWorkModern")
);
const PageWorkDetail = React.lazy(() =>
  import("./pages/Pages/Work/PageWorkDetail")
);
const PageWorkClassic = React.lazy(() =>
  import("./pages/Pages/Work/PageWorkClassic")
);
const PageWorkGrid = React.lazy(() =>
  import("./pages/Pages/Work/PageWorkGrid")
);
const PageWorkMasonry = React.lazy(() =>
  import("./pages/Pages/Work/PageWorkMasonry")
);

//Utility
const PagePrivacy = React.lazy(() =>
  import("./pages/Pages/Utility/PagePrivacy")
);
const PageTerms = React.lazy(() => import("./pages/Pages/Utility/PageTerms"));

//Contact
const PageContactDetail = React.lazy(() =>
  import("./pages/Pages/Contact/PageContactDetail")
)

//Email
const EmailAlert = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailAlert")
);
const EmailPasswordReset = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailPasswordReset")
);
const EmailConfirmation = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailConfirmation")
);
const EmailInvoice = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailInvoice")
);

//Help Center
const HelpCenterOverview = React.lazy(() =>
  import("./pages/Pages/HelpCenter/HelpCenterOverview")
);
const HelpCenterFaqs = React.lazy(() =>
  import("./pages/Pages/HelpCenter/HelpCenterFaqs")
);
const HelpCenterGuides = React.lazy(() =>
  import("./pages/Pages/HelpCenter/HelpCenterGuides")
);
const HelpCenterSupportRequest = React.lazy(() =>
  import("./pages/Pages/HelpCenter/HelpCenterSupportRequest")
);

//Shop
const ShopProducts = React.lazy(() =>
  import("./pages/Pages/Shop/ShopProducts")
);
const ShopProductDetail = React.lazy(() =>
  import("./pages/Pages/Shop/ShopProductDetail")
);const Categories = React.lazy(() =>
  import("./pages/Pages/Shop/Categories")
);
const ShopProductsCompany = React.lazy(() =>
  import("./pages/Pages/Shop/ShopProductsCompany")
);const ShopProductsCategory = React.lazy(() =>
  import("./pages/Pages/Shop/ShopProductsCategory")
);
const ShopProductsBrand = React.lazy(() =>
  import("./pages/Pages/Shop/ShopProductsBrand")
);
const ShopCart = React.lazy(() => import("./pages/Pages/Shop/ShopCart"));
const ShopCheckouts = React.lazy(() =>
  import("./pages/Pages/Shop/ShopCheckouts")
);const ShopCartCheckouts = React.lazy(() =>
  import("./pages/Pages/Shop/ShopCartCheckouts")
);
const ShopMyAccount = React.lazy(() =>
  import("./pages/Pages/Shop/ShopMyAccount")
);

const routes = [
  //routes without Layout

  //Contct without layout
  {
    path: "/contact",
    component: PageContactDetail,
    isWithoutLayout: true,
  },

  { path: "/email-invoice", component: EmailInvoice, isWithoutLayout: true },


  { path: "/page-error", component: PageError, isWithoutLayout: true },
  { path: "/page-thankyou", component: PageThankYou, isWithoutLayout: true },

  // //User Pages
  // { path: "/auth-login", component: PageLogin, isWithoutLayout: true },
  // {
  //   path: "/auth-cover-login",
  //   component: PageCoverLogin,
  //   isWithoutLayout: true,
  // },
  {
    path: "/login",
    component: PageLoginThree,
    isWithoutLayout: true,
  },
  //
  // { path: "/auth-signup", component: PageSignup, isWithoutLayout: true },
  // {
  //   path: "/auth-cover-signup",
  //   component: PageCoverSignup,
  //   isWithoutLayout: true,
  // },
  {
    path: "/register",
    component: PageSignupThree,
    isWithoutLayout: true,
  },

  {
    path: "/auth-re-password-three",
    component: PageRePasswordThree,
    isWithoutLayout: true,
  },
  {
    path: "/verifying",
    component: VerifyingCode,
    isWithoutLayout: true,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    isWithoutLayout: true,
  },

  // Landings
  { path: "/index-event", component: Event },
  { path: "/index-single", component: SingleProduct },
  { path: "/index-shop", component: Shop },

  { path: "/page-aboutus", component: PageAboutUs },
  { path: "/page-history", component: PageHistory },

  //Help Center
  { path: "/help-center", component: HelpCenterOverview },
  { path: "/faqs", component: HelpCenterFaqs },
  { path: "/support", component: HelpCenterSupportRequest },

  //Shop
  { path: "/products", component: ShopProducts },
   { path: "/shop-product-detail/:id", component: ShopProductDetail },
  { path: "/brands/:id/products", component: ShopProductsBrand },
  { path: "/stores/:id/products", component: ShopProductsCompany },
  { path: "/category-products/:id", component: ShopProductsCategory },
  { path: "/shop-cart", component: ShopCart },
  { path: "/category/:id", component: Categories },
  { path: "/shop-checkouts", component: ShopCheckouts },
  { path: "/my-checkouts/:id", component: ShopCartCheckouts },
  { path: "/shop-myaccount", component: ShopMyAccount },

  //Utility
  { path: "/page-terms", component: PageTerms },
  { path: "/page-privacy", component: PagePrivacy },

  //Page Work
  { path: "/news", component: PageWorkModern },
  { path: "/news/:id", component: PageWorkDetail },
  { path: "/page-work-classic", component: PageWorkClassic },
  { path: "/page-work-grid", component: PageWorkGrid },
  { path: "/brands", component: PageWorkMasonry },

  //Page Profile
  { path: "/page-profile", component: PageProfile },
  { path: "/page-members", component: PageMembers },
  { path: "/page-works", component: PageWorks },
  { path: "/page-messages", component: PageMessages },
  { path: "/page-profile-edit", component: PageProfileEdit },
  { path: "/page-payments", component: PagePayments },
  { path: "/page-invoice", component: PageInvoice },

  //Page Job
  // { path: "/page-job", component: PageJob },
  // { path: "/page-job-apply", component: PageJobApply },
  // { path: "/page-job-detail", component: PageJobDetail },
  { path: "/page-jobs-sidebar", component: PageJobsSidebar },
  { path: "/stores", component: PageCompanyList },
  { path: "/page-job-candidate-list", component: PageCandidateList },
  { path: "/stores/:id", component: PageJobCompany },
  // { path: "/page-job-candidate", component: PageJobCandidate },

  //Page Blog
  { path: "/page-blog-grid", component: PageBlog },
  { path: "/page-blog-detail", component: PageBlogDetail },
  { path: "/page-blog-detail-two", component: PageBlogDetailTwo },
  { path: "/page-blog-sidebar", component: PageBlogSidebar },
  { path: "/page-blog-list", component: PageBlogList },
  { path: "/page-blog-list-sidebar", component: PageBlogListSidebar },

  //Page Contact
  // { path: "/page-contact-one", component: PageContactOne },
  // { path: "/page-contact-three", component: PageContactThree },
  // { path: "/page-contact-two", component: PageContactTwo },

  //Index Main
  { path: "/index", component: Shop },

  //Index root

  { path: "/", component: Shop, isWithoutLayout: false, exact: true},
  { component: PageError, isWithoutLayout: true, exact: false },
];

export default routes;
