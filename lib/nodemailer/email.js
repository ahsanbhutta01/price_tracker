import nodemailer from 'nodemailer'


function generateEmailHtml(product, oldPrice, newPrice, priceDrop, percentageDrop) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Price Drop Alert</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 30px 40px; background: linear-gradient(135deg, #FA5D19 0%, #ff7a47 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎉 Price Drop Alert!</h1>
                </td>
              </tr>
              
              <!-- Product Info -->
              <tr>
                <td style="padding: 40px;">
                  <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                    Great news! The price of <strong>${product.name}</strong> has dropped!
                  </p>
                  
                  ${product.image_url ? `
                  <div style="text-align: center; margin: 20px 0;">
                    <img src="${product.image_url}" alt="${product.name}" style="max-width: 300px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                  </div>
                  ` : ''}
                  
                  <!-- Price Comparison -->
                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                    <tr>
                      <td style="padding: 20px; background-color: #fef2f2; border-radius: 8px 0 0 8px; text-align: center; width: 50%;">
                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #991b1b; text-decoration: line-through;">Old Price</p>
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #991b1b;">${product.currency} ${oldPrice.toFixed(2)}</p>
                      </td>
                      <td style="padding: 20px; background-color: #f0fdf4; border-radius: 0 8px 8px 0; text-align: center; width: 50%;">
                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #166534;">New Price</p>
                        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #166534;">${product.currency} ${newPrice.toFixed(2)}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Savings Badge -->
                  <div style="text-align: center; margin: 20px 0;">
                    <div style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50px;">
                      <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                        💰 Save ${product.currency} ${priceDrop.toFixed(2)} (${percentageDrop}% OFF)
                      </p>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${product.url}" style="display: inline-block; padding: 15px 40px; background-color: #FA5D19; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(250, 93, 25, 0.3);">
                      View Product Now →
                    </a>
                  </div>
                  
                  <p style="margin: 20px 0 0 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                    Don't miss out on this deal! Prices can change at any time.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
                    You're receiving this email because you're tracking this product on PriceTracker.<br>
                    Happy shopping! 🛍️
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});


export async function sendPriceDropAlert(userEmail, product, oldPrice, newPrice) {
  try {
    const priceDrop = oldPrice - newPrice;
    const percentageDrop = ((priceDrop / oldPrice) * 100).toFixed(1);

    const mailOptions = {
      from: '"PriceTracker <(B.)Price@tracker.pro>"',
      to: userEmail,
      subject: `🎉 Price Drop Alert: ${product.name}`,
      text: `Great news! The price of ${product.name} has dropped by ${percentageDrop}%! Old price: ${product.currency} ${oldPrice.toFixed(2)}, New price: ${product.currency} ${newPrice.toFixed(2)}. View product: ${product.url}`,
      html:  generateEmailHtml(product, oldPrice, newPrice, priceDrop, percentageDrop)
    };

    const data = await transporter.sendMail(mailOptions);
    if (!data) {
      console.error("Email send error");
      return;
    }

    return { success: true, data }


  } catch (error) {

  }
}