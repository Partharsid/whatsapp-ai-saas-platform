"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});
class RazorpayService {
    static async createSubscription(planId, customerId) {
        try {
            const options = {
                plan_id: planId,
                customer_notify: 1,
                total_count: 12, // 1 year by default
            };
            const subscription = await razorpay.subscriptions.create(options);
            return subscription;
        }
        catch (error) {
            console.error('Error creating Razorpay subscription:', error);
            throw error;
        }
    }
    static verifyWebhookSignature(body, signature, secret) {
        const expectedSignature = crypto_1.default
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');
        return expectedSignature === signature;
    }
}
exports.RazorpayService = RazorpayService;
