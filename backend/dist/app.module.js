"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const forum_module_1 = require("./forum/forum.module");
const scraper_module_1 = require("./scraper/scraper.module");
const slope_module_1 = require("./slope/slope.module");
const dayTrack_module_1 = require("./dayTrack/dayTrack.module");
const friend_request_module_1 = require("./friend-request/friend-request.module");
const schedule_1 = require("@nestjs/schedule");
const suggestions_module_1 = require("./suggestions/suggestions.module");
const chat_module_1 = require("./chat/chat.module");
const review_module_1 = require("./review/review.module");
const achievement_module_1 = require("./achievement/achievement.module");
const userachievement_module_1 = require("./userachievement/userachievement.module");
const stripe_module_1 = require("./stripe/stripe.module");
const ski_domain_module_1 = require("./ski-domain/ski-domain.module");
const ski_installation_module_1 = require("./ski-installation/ski-installation.module");
console.log('🌐 Using Mongo URI:', process.env.MONGO);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            forum_module_1.ForumModule,
            scraper_module_1.ScraperModule,
            slope_module_1.SlopeModule,
            dayTrack_module_1.DayTrackModule,
            friend_request_module_1.FriendRequestModule,
            suggestions_module_1.SuggestionsModule,
            chat_module_1.ChatModule,
            review_module_1.ReviewModule,
            achievement_module_1.AchievementModule,
            userachievement_module_1.UserAchievementModule,
            stripe_module_1.StripeModule,
            ski_domain_module_1.SkiDomainModule,
            ski_installation_module_1.SkiInstallationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map