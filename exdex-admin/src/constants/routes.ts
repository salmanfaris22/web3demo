export const routes = {
    helpCenter: "/help-center",
    helpCenterManage : "/help-center/manage",
    subCategory : "/help-center/manage/:category/:categoryId/:cardType",
    primarySectionQns: "/help-center/manage/:category/:categoryId/:subCategory/:cardType/questions/:subCategoryId",
    lookingForSeomthingElse : "/looking-for-something-else",
    popularSection : "/help-center/manage/popular-section",
    editQuestions : "/help-center/manage/:category/:subCategory/questions/:subCategoryId/:qnId/:type",
    editQuestionFromAll : "/help-center/manage/category/subcategory/questions/:qnId/:type",
    addQuestions : "/help-center/manage/:category/:subCategory/questions/:subCategoryId/:type"
    ,finance : "/finance",
    tickets : "/tickets",
    userTickets : "/tickets/:id",
    ticketReply :"/tickets/:userId/ticket-replay/:ticketId",
    influencers : "/influencers",
    influencerDetails : "/influencers/:id",
    blogCreate : "/create-blog",
    blogListing :"/blogs",
    blogEdit :"/create-blog/:id",
    announcement : "/announcements",
    createAnnouncements : "/create-announcement",
    editAnnouncement : "/create-announcement/:id"
}