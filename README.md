# Aalayam Arts E-commerce

Build a Premium Temple Statue E-Commerce Website

Act as a senior UI/UX designer and full-stack web developer. Build a modern, premium, fully responsive e-commerce web application for a traditional Indian temple statue and sculpture business.

1. Brand Identity

Brand Name: Aalayam Arts
Tagline: "Divinity Carved with Devotion"

Business: Selling traditional Indian temple statues, Hindu deity idols, stone sculptures, bronze statues, brass idols, Panchaloha idols, and custom-made temple sculptures.

Target Customers:

Individual customers and families

Hindu temples and temple committees

Pooja shops and resellers

Architects and interior designers

International customers and Indian diaspora

2. Design Direction

Create a luxurious, elegant, traditional Indian aesthetic combined with modern e-commerce usability.

Color palette:

Deep Maroon: #681C28

Antique Gold: #C5A15B

Ivory: #F8F4EC

Charcoal: #211D1A

White: #FFFFFF

Design requirements:

Premium typography with elegant serif headings and clean sans-serif body text.

Large, high-quality statue photography.

Spacious layouts, subtle shadows, refined borders and smooth animations.

Premium product cards with beautiful hover effects.

Consistent spacing, rounded corners and a professional design system.

Fully responsive for desktop, tablet and mobile.

Avoid excessive gradients, cartoon icons, generic templates and cluttered layouts.

Use authentic Indian sculpture imagery and culturally appropriate visual styling.

The website should feel like a premium sculpture showroom, not a generic online shopping template.

3. Homepage

Build the following sections:

Announcement Bar

Display messages such as:
"Handcrafted Divine Sculptures | Custom Orders Available | Secure Shipping"

Header

Brand logo and name

Home

Shop

Categories

Custom Statues

Temple Projects

About Us

Contact

Search

Account

Wishlist

Shopping Cart

Include a responsive mobile navigation menu.

Hero Section

Use a large, premium hero image featuring a beautifully photographed traditional Nataraja or other Hindu deity statue.

Headline:
"Bring Divinity Into Your Space"

Subtitle:
"Discover timeless temple sculptures crafted with devotion, tradition and exceptional artistry."

Buttons:

Explore Collection

Request Custom Statue

Use an elegant dark maroon or charcoal overlay where appropriate, with gold and ivory typography.

Shop by Category

Create visual category cards for:

Ganesha Statues

Lord Murugan Statues

Shiva and Nataraja Statues

Lakshmi and Vishnu Statues

Bronze and Panchaloha Idols

Granite and Stone Sculptures

Brass Pooja Idols

Custom Temple Sculptures

Each category should link to a filtered product listing.

Featured Products

Display premium product cards with:

Product image

Product name

Price in INR

Material

Height

Availability

Wishlist button

Quick View

Add to Cart

View Details

Additional Homepage Sections

Best Sellers

New Arrivals

Custom Sculpture Services

Our Artisan Craftsmanship

Temple and Bulk Orders

Why Choose Aalayam Arts

Customer Reviews

Frequently Asked Questions

Newsletter Subscription

WhatsApp Contact CTA

Comprehensive footer

4. Shop and Product Listing Page

Create a professional product catalogue with search, sorting and filters.

Filters:

Deity

Material

Height and dimensions

Price range

Product availability

Ready-made or made-to-order

Sculpture style

Sorting:

Featured

Price: Low to High

Price: High to Low

Newest

Best Selling

Add pagination or a load-more button.

Use realistic sample products with Indian Rupee pricing. Clearly identify all sample products as demonstration data until real inventory is added.

5. Product Details Page

Each product page must include:

Multiple product images

Image zoom

Product title and SKU

Price in INR

Material and finish

Height, width, depth and weight

Craftsmanship details

Product description

Stock status or estimated production time

Quantity selector

Add to Cart

Buy Now

Add to Wishlist

Delivery PIN code checker

Estimated delivery information

Shipping and return policy

Related products

Customer reviews

Allow customers to select available product variations such as size, finish or material. Update pricing dynamically when a variation has a different price.

Do not claim a product is made from Panchaloha, certified, consecrated or handcrafted unless that information has been provided and verified by the business.

For large statues, show a "Request Shipping Quote" option if shipping charges depend on dimensions, weight or destination.

6. Custom Statue Order System

This is a key business feature.

Create a dedicated "Custom Statue" page with a beautiful introduction and a multi-step enquiry form.

Fields:

Customer name

Phone number

Email

Deity or sculpture name

Statue material

Required height and dimensions

Required quantity

Intended use: home, temple, commercial or other

Delivery location

Budget range

Required delivery date

Additional instructions

Reference image upload

After submission:

Validate all required fields.

Display a clear confirmation message.

Generate a unique enquiry reference number.

Store the enquiry in the database.

Display enquiry details in the admin dashboard.

Allow the admin to respond with a quotation and estimated completion time.

Support enquiry status tracking:
Submitted → Under Review → Quotation Sent → Approved → In Production → Ready for Dispatch → Completed.

Do not display a confirmed quotation or completion date until the business has approved it.

7. Shopping Cart and Checkout

Implement a functional shopping cart with:

Add and remove products

Change quantities

Selected product variations

Subtotal

Shipping estimate

Discount code

Final total

Continue Shopping

Proceed to Checkout

Checkout fields:

Customer name

Email

Phone

Shipping address

City

State

PIN code

Country

Billing address if different

Order notes

Payment options should be structured for integration with Razorpay or another supported payment provider.

Important:

Never simulate a successful real payment.

Use test mode during development.

Verify payment status on the server before marking an order as paid.

Keep payment secrets in server-side environment variables.

Display clear order confirmation and order reference after a verified order is created.

Include order tracking with statuses:
Order Placed → Confirmed → Processing → Packed → Shipped → Delivered.

8. Customer Account

Create customer authentication and account pages.

Features:

Sign up

Login

Logout

Forgot Password

Customer profile

Saved addresses

Order history

Order details and tracking

Wishlist

Custom enquiry history

Use secure authentication. Do not store passwords in plain text.

Allow guest checkout if appropriate.

9. Admin Dashboard

Create a separate protected admin area with a professional dashboard.

Dashboard overview:

Total orders

Total revenue from verified orders

Pending orders

Products in stock

Low-stock products

Pending custom enquiries

Recent orders

Sales overview

Product Management:

Create, edit and delete products

Upload product images

Set product prices

Configure sizes and variations

Manage stock

Set product status

Manage categories

Mark featured products

Order Management:

View orders

View customer and delivery details

Update fulfilment status

Track payment status

Add shipping and tracking details

View order history

Custom Enquiry Management:

View submitted enquiries

View reference images

Prepare and update quotations

Set estimated production times

Update enquiry status

Record internal notes

Additional features:

Customer management

Coupon management

Product reviews moderation

Homepage banner management

Basic sales reports

Business contact and store settings

Protect admin routes using role-based authorization enforced on the backend. Never rely only on hiding admin links in the frontend.

10. Database and Backend

Use Supabase for PostgreSQL database, authentication and image storage, unless the existing project already uses an appropriate backend.

Create a well-structured schema for:

profiles

user_roles

categories

products

product_images

product_variants

inventory

carts

cart_items

wishlists

wishlist_items

addresses

orders

order_items

payments

custom_enquiries

quotations

reviews

coupons

Add appropriate:

Primary and foreign keys

Data validation

Timestamps

Unique order and enquiry references

Indexes

Row Level Security (RLS) policies

Role-based access controls

Customers should only access their own private account, orders, addresses and enquiries. Public users may read published product information. Only authorized administrators may manage products, inventory and all customer enquiries.

Never expose Supabase service-role keys or other private credentials in frontend code.

Do not rely on localStorage as the permanent database for orders, payments, products or customer enquiries.

11. Search and User Experience

Implement:

Product search with relevant results

Category navigation

Loading states

Empty states

Error messages

Form validation

Toast notifications

Responsive navigation

Accessible buttons and form labels

Keyboard-friendly interactions

Useful confirmation dialogs

SEO-friendly product URLs

Page titles and meta descriptions

Add floating WhatsApp support using a configurable business phone number. Do not invent the actual number.

12. Shipping and Trust

Add dedicated pages for:

About Us

Contact Us

Shipping Policy

Returns and Refunds

Privacy Policy

Terms and Conditions

Frequently Asked Questions

Include an area to display authentic business contact information, workshop location, shipping information and product care instructions.

For fragile and heavy sculptures, clearly communicate that shipping estimates may require manual confirmation.

13. Technical Requirements

Use React with TypeScript.

Use the existing framework and project structure if one is already established.

Use Tailwind CSS and reusable UI components.

Use Lucide icons.

Use a consistent, maintainable component architecture.

Build responsive layouts and reusable product cards, filters, forms and navigation.

Keep business logic separate from presentation.

Use environment variables for secrets.

Add appropriate loading, error and success states.

Optimize product images and performance.

Implement authentication and database operations securely.

Ensure every important button has a real, meaningful action.

Do not leave important features as non-functional placeholders.

14. Development and Implementation Process

Work in these phases:

Phase 1: Build the complete visual design and responsive storefront with realistic demonstration products.

Phase 2: Implement product search, category filtering, product details, cart and wishlist.

Phase 3: Connect Supabase and implement authentication, database tables and secure access policies.

Phase 4: Implement checkout, server-side order creation and payment-provider integration in test mode.

Phase 5: Build the protected admin dashboard and custom statue enquiry management system.

Phase 6: Test mobile responsiveness, authentication, access control, form validation, cart calculations and order flows.

Start by inspecting the existing project before making changes. Preserve working functionality and avoid replacing configured integrations unnecessarily.

If credentials or external service configuration are missing, clearly identify what is needed and build the integration structure without pretending it is fully operational.

Final Goal

Deliver a polished, premium, production-oriented temple statue e-commerce website for Aalayam Arts.

The storefront should look luxurious, trustworthy and culturally authentic. Customers must be able to browse statues, compare product details, add products to a cart, submit custom sculpture enquiries and track orders. Administrators must be able to manage products, orders, inventory, quotations and customer enquiries through a protected dashboard.

Prioritize beautiful UI/UX, real functionality, secure architecture, mobile responsiveness and a smooth customer shopping experience.

Begin building the application now. Do not stop at a static mockup or a homepage design.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3f7c4018-6ccb-5552-bd8f-ca89664d22df).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
