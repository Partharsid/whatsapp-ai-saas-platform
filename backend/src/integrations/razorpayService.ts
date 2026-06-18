import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export class RazorpayService {
  static async createSubscription(planId: string, customerId?: string) {
    try {
      const options = {
        plan_id: planId,
        customer_notify: 1,
        total_count: 12, // 1 year by default
      };
      
      const subscription = await razorpay.subscriptions.create(options);
      return subscription;
    } catch (error) {
      console.error('Error creating Razorpay subscription:', error);
      throw error;
    }
  }

  static verifyWebhookSignature(body: string, signature: string, secret: string) {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
      
    return expectedSignature === signature;
  }
}
