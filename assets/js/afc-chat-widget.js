/*!
 * Coach Anne's AI Assistant - Anneloes Fitness Coaching
 * Drop-in chat widget. Include this one script tag near the end of
 * <body> on every page:
 *
 *   <script src="assets/js/afc-chat-widget.js" defer></script>
 *
 * Requires the site's brand CSS variables (--gold, --flare, --bone, --ink,
 * --line, --steel, --surface, --shadow-lift) already defined in :root,
 * and the fonts 'Inter' and 'JetBrains Mono' loaded (both already used
 * across the site). No other setup needed on each page.
 *
 * Config (Supabase + OpenRouter) is set once below.
 */
(function () {
    'use strict';

    var WIDGET_CSS = "        #afcChatToggle {\n            position: fixed;\n            bottom: 22px;\n            right: 22px;\n            z-index: 9999;\n            width: 64px;\n            height: 64px;\n            border-radius: 50%;\n            border: 3px solid #fff;\n            background: linear-gradient(135deg, var(--gold), var(--flare));\n            color: #fff;\n            cursor: pointer;\n            box-shadow: var(--shadow-lift);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            transition: transform .2s ease;\n            padding: 0;\n            overflow: visible;\n        }\n\n        #afcChatToggle:hover {\n            transform: scale(1.06);\n        }\n\n        #afcChatToggle img {\n            width: 100%;\n            height: 100%;\n            border-radius: 50%;\n            object-fit: cover;\n            display: block;\n        }\n\n        #afcChatToggle svg {\n            width: 26px;\n            height: 26px;\n        }\n\n        .afc-toggle-dot {\n            position: absolute;\n            bottom: 2px;\n            right: 2px;\n            width: 16px;\n            height: 16px;\n            border-radius: 50%;\n            background: #2ecc71;\n            border: 2.5px solid #fff;\n        }\n\n        .afc-toggle-badge {\n            position: absolute;\n            top: -4px;\n            left: -4px;\n            background: var(--ink);\n            color: #fff;\n            font-family: 'JetBrains Mono', monospace;\n            font-size: 8.5px;\n            font-weight: 700;\n            letter-spacing: .04em;\n            padding: 3px 6px;\n            border-radius: 8px;\n            border: 2px solid #fff;\n        }\n\n        #afcChatWindow {\n            position: fixed;\n            bottom: 100px;\n            right: 22px;\n            z-index: 9999;\n            width: 380px;\n            max-width: calc(100vw - 32px);\n            height: 560px;\n            max-height: calc(100vh - 140px);\n            background: var(--surface);\n            border: 1px solid var(--line);\n            border-radius: 20px;\n            box-shadow: var(--shadow-lift);\n            display: none;\n            flex-direction: column;\n            overflow: hidden;\n            font-family: 'Inter', sans-serif;\n        }\n\n        #afcChatWindow.open {\n            display: flex;\n        }\n\n        .afc-header {\n            background: linear-gradient(135deg, var(--gold), var(--flare));\n            color: #fff;\n            padding: 16px 18px;\n            display: flex;\n            align-items: center;\n            gap: 12px;\n        }\n\n        .afc-header-avatar {\n            width: 42px;\n            height: 42px;\n            border-radius: 50%;\n            object-fit: cover;\n            border: 2px solid rgba(255,255,255,.7);\n            flex-shrink: 0;\n        }\n\n        .afc-header-text {\n            flex: 1;\n            min-width: 0;\n        }\n\n        .afc-header-title {\n            font-weight: 700;\n            font-size: 14.5px;\n            display: flex;\n            align-items: center;\n            gap: 6px;\n        }\n\n        .afc-verified {\n            width: 14px;\n            height: 14px;\n            flex-shrink: 0;\n        }\n\n        .afc-header-sub {\n            font-family: 'JetBrains Mono', monospace;\n            font-size: 10px;\n            opacity: .92;\n            letter-spacing: .03em;\n            display: flex;\n            align-items: center;\n            gap: 5px;\n            margin-top: 2px;\n        }\n\n        .afc-header-sub::before {\n            content: '';\n            width: 6px;\n            height: 6px;\n            border-radius: 50%;\n            background: #2ecc71;\n            display: inline-block;\n        }\n\n        .afc-close {\n            background: rgba(255,255,255,.18);\n            border: none;\n            color: #fff;\n            width: 30px;\n            height: 30px;\n            border-radius: 50%;\n            cursor: pointer;\n            font-size: 17px;\n            line-height: 1;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            flex-shrink: 0;\n        }\n\n        .afc-messages {\n            flex: 1;\n            overflow-y: auto;\n            padding: 16px;\n            display: flex;\n            flex-direction: column;\n            gap: 12px;\n            background: var(--bone);\n        }\n\n        .afc-row {\n            display: flex;\n            gap: 8px;\n            align-items: flex-end;\n            max-width: 90%;\n        }\n\n        .afc-row.user {\n            align-self: flex-end;\n            flex-direction: row-reverse;\n        }\n\n        .afc-row.bot {\n            align-self: flex-start;\n        }\n\n        .afc-avatar-sm {\n            width: 26px;\n            height: 26px;\n            border-radius: 50%;\n            object-fit: cover;\n            flex-shrink: 0;\n        }\n\n        .afc-msg {\n            padding: 10px 13px;\n            border-radius: 14px;\n            font-size: 13.5px;\n            line-height: 1.5;\n            white-space: pre-wrap;\n            word-break: break-word;\n        }\n\n        .afc-msg a {\n            color: inherit;\n            text-decoration: underline;\n            font-weight: 600;\n        }\n\n        .afc-row.bot .afc-msg {\n            background: #fff;\n            border: 1px solid var(--line);\n            color: var(--ink);\n            border-bottom-left-radius: 4px;\n        }\n\n        .afc-row.user .afc-msg {\n            background: var(--flare);\n            color: #fff;\n            border-bottom-right-radius: 4px;\n        }\n\n        .afc-row.user .afc-msg a {\n            color: #fff;\n        }\n\n        .afc-typing-row {\n            display: flex;\n            gap: 8px;\n            align-items: flex-end;\n        }\n\n        .afc-typing {\n            display: flex;\n            gap: 4px;\n            padding: 12px 14px;\n            background: #fff;\n            border: 1px solid var(--line);\n            border-radius: 14px;\n            border-bottom-left-radius: 4px;\n        }\n\n        .afc-typing span {\n            width: 6px;\n            height: 6px;\n            border-radius: 50%;\n            background: var(--steel);\n            animation: afcBounce 1.2s infinite ease-in-out;\n        }\n\n        .afc-typing span:nth-child(2) { animation-delay: .15s; }\n        .afc-typing span:nth-child(3) { animation-delay: .3s; }\n\n        @keyframes afcBounce {\n            0%, 60%, 100% { transform: translateY(0); opacity: .5; }\n            30% { transform: translateY(-4px); opacity: 1; }\n        }\n\n        .afc-lead-saved {\n            align-self: center;\n            font-family: 'JetBrains Mono', monospace;\n            font-size: 10.5px;\n            letter-spacing: .04em;\n            color: var(--steel);\n            background: #fff;\n            border: 1px dashed var(--line);\n            padding: 5px 12px;\n            border-radius: 20px;\n            display: flex;\n            align-items: center;\n            gap: 6px;\n        }\n\n        .afc-lead-saved svg {\n            width: 12px;\n            height: 12px;\n            color: #2ecc71;\n            flex-shrink: 0;\n        }\n\n        .afc-quick {\n            display: flex;\n            flex-wrap: wrap;\n            gap: 6px;\n            padding: 0 16px 12px;\n            background: var(--bone);\n        }\n\n        .afc-quick button {\n            font-family: 'JetBrains Mono', monospace;\n            font-size: 10.5px;\n            letter-spacing: .03em;\n            padding: 6px 10px;\n            border-radius: 20px;\n            border: 1px solid var(--line);\n            background: #fff;\n            color: var(--ink);\n            cursor: pointer;\n        }\n\n        .afc-quick button:hover {\n            border-color: var(--flare);\n            color: var(--flare);\n        }\n\n        .afc-input-row {\n            display: flex;\n            gap: 8px;\n            padding: 12px;\n            border-top: 1px solid var(--line);\n            background: #fff;\n        }\n\n        .afc-input-row input {\n            flex: 1;\n            border: 1px solid var(--line);\n            border-radius: 24px;\n            padding: 10px 14px;\n            font-size: 13.5px;\n            font-family: 'Inter', sans-serif;\n            outline: none;\n        }\n\n        .afc-input-row input:focus {\n            border-color: var(--flare);\n        }\n\n        .afc-send {\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            border: none;\n            background: var(--ink);\n            color: #fff;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            flex-shrink: 0;\n        }\n\n        .afc-send:disabled {\n            opacity: .5;\n            cursor: not-allowed;\n        }\n\n        .afc-footer-note {\n            text-align: center;\n            font-family: 'JetBrains Mono', monospace;\n            font-size: 9.5px;\n            color: var(--steel);\n            padding: 6px 0 10px;\n            background: #fff;\n            letter-spacing: .02em;\n        }\n\n        @media (max-width: 480px) {\n            #afcChatWindow {\n                right: 16px;\n                bottom: 90px;\n                width: calc(100vw - 32px);\n            }\n            #afcChatToggle {\n                right: 16px;\n                bottom: 16px;\n            }\n        }\n";
    var WIDGET_HTML = "    <button id=\"afcChatToggle\" aria-label=\"Open Anneloes Fitness Coaching AI assistant\">\n        <span class=\"afc-toggle-badge\">AI</span>\n        <img src=\"assets/OwnerPic/Owner.jpg\" alt=\"Coach Anne\">\n        <span class=\"afc-toggle-dot\"></span>\n    </button>\n\n    <div id=\"afcChatWindow\">\n        <div class=\"afc-header\">\n            <img class=\"afc-header-avatar\" src=\"assets/OwnerPic/Owner.jpg\" alt=\"Coach Anne\">\n            <div class=\"afc-header-text\">\n                <div class=\"afc-header-title\">\n                    Coach Anne's AI Assistant\n                    <svg class=\"afc-verified\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2l2.4 2.2 3.2-.6 1 3.1 3.1 1-.6 3.2L23.3 13l-2.2 2.4.6 3.2-3.1 1-1 3.1-3.2-.6L12 24l-2.4-2.2-3.2.6-1-3.1-3.1-1 .6-3.2L.7 13l2.2-2.4-.6-3.2 3.1-1 1-3.1 3.2.6L12 2z\"/><path d=\"M9 12.5l2 2 4-4.5\" stroke=\"var(--flare)\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n                </div>\n                <div class=\"afc-header-sub\">Trained on Anneloes Fit Coaching &bull; replies instantly</div>\n            </div>\n            <button class=\"afc-close\" id=\"afcClose\" aria-label=\"Close chat\">&times;</button>\n        </div>\n        <div class=\"afc-messages\" id=\"afcMessages\">\n            <div class=\"afc-row bot\">\n                <img class=\"afc-avatar-sm\" src=\"assets/OwnerPic/Owner.jpg\" alt=\"\">\n                <div class=\"afc-msg\">Hi, I'm Coach Anne's AI assistant. I can help you find the right program, explain coaching and nutrition, or get you the free guide. What can I help with?</div>\n            </div>\n        </div>\n        <div class=\"afc-quick\" id=\"afcQuick\">\n            <button type=\"button\" data-q=\"Which program is right for me?\">Which program fits me?</button>\n            <button type=\"button\" data-q=\"Can I see the programs and pricing?\">See programs</button>\n            <button type=\"button\" data-q=\"I'd like the free guide, can you help me get it?\">Get the free guide</button>\n        </div>\n        <div class=\"afc-input-row\">\n            <input type=\"text\" id=\"afcInput\" placeholder=\"Ask about coaching, nutrition, programs...\" autocomplete=\"off\">\n            <button class=\"afc-send\" id=\"afcSend\" aria-label=\"Send message\">\n                <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line><polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon></svg>\n            </button>\n        </div>\n        <div class=\"afc-footer-note\">AI assistant &bull; may occasionally be inaccurate</div>\n    </div>\n";

    function injectStyles(css) {
        var style = document.createElement('style');
        style.setAttribute('data-afc-widget', 'true');
        style.textContent = css;
        document.head.appendChild(style);
    }

    function injectMarkup(html) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        while (wrapper.firstChild) {
            document.body.appendChild(wrapper.firstChild);
        }
    }

    function loadScriptOnce(src) {
        return new Promise(function (resolve) {
            if (document.querySelector('script[src="' + src + '"]')) {
                resolve();
                return;
            }
            var s = document.createElement('script');
            s.src = src;
            s.onload = function () { resolve(); };
            s.onerror = function () { resolve(); }; // proceed even if this fails; lead saving just gets disabled
            document.head.appendChild(s);
        });
    }

    function init() {
        // Avoid double-init if the script is accidentally included twice
        if (document.getElementById('afcChatToggle')) return;

        injectStyles(WIDGET_CSS);
        injectMarkup(WIDGET_HTML);

        // ---------- CONFIG: fill these in ----------
        var OPENROUTER_API_KEY = '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';
        var OPENROUTER_MODEL = 'openai/gpt-4o-mini';
        var SUPABASE_URL = 'https://hqgxxaflmduofhcmanio.supabase.co'; // e.g. https://xxxxxxxx.supabase.co (same as used in auth.js)
        var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZ3h4YWZsbWR1b2ZoY21hbmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDc0NjcsImV4cCI6MjEwMTQyMzQ2N30.Dryx8ucZK6Ww1GF5tOa0NXhQVa7O1rO6iy-p-PawvUE'; // Supabase anon/public key, safe for client-side use with RLS
        // --------------------------------------------

        var supabaseClient = null;
        var leadSavingEnabled = SUPABASE_URL.indexOf('YOUR_SUPABASE') === -1 && SUPABASE_ANON_KEY.indexOf('YOUR_SUPABASE') === -1;
        if (leadSavingEnabled && window.supabase) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }

        var TOOLS = [{
            type: 'function',
            function: {
                name: 'save_lead',
                description: 'Save a website visitor as a lead once they have willingly given their name and email in this chat (for example: asking for the free guide, wanting a program recommendation followed up on, or wanting to be contacted about coaching). Only call this when you already have a real name and a real-looking email typed by the user in the conversation. Never invent or guess values.',
                parameters: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', description: "Visitor's name exactly as they gave it" },
                        email: { type: 'string', description: "Visitor's email address exactly as they gave it" },
                        interest: { type: 'string', description: 'Short label for what they want, e.g. Strong Foundation coaching, Full Strength coaching, Peach Plan, free guide, program recommendation, general enquiry' },
                        notes: { type: 'string', description: 'Optional short summary of their goal or situation from the conversation, one sentence max' }
                    },
                    required: ['name', 'email']
                }
            }
        }];

        var SYSTEM_PROMPT = [
            'You are Coach Anne\'s AI Assistant, the official AI assistant for Anneloes Fitness Coaching (annefit.vercel.app), an online Hyrox and strength coaching service run by Coach Anne, an EREPS Level 4 certified strength and sports nutrition coach with 20+ years of experience.',
            '',
            'ROLE: Help visitors understand Anneloes Fitness Coaching programs, fitness approach, nutrition guidance and services. Guide users toward the correct program based on their goals. Keep every response short, clear, friendly and actionable. Never generate long paragraphs unless the user specifically asks for detailed information. Limit most answers to 2-4 short sentences. Ask one follow-up question when more information is needed.',
            '',
            'COMMUNICATION STYLE: Friendly, professional, motivating, simple English. No emojis unless the user uses them first. No markdown formatting, no bold text, no bullet symbols unless listing options. No unnecessary introductions. Answer directly. Keep responses under 120 words whenever possible. Never hallucinate information, testimonials, certifications or policies not listed below.',
            '',
            'LINKS YOU CAN SHARE: write these exactly as plain text (no markdown brackets) whenever they are relevant, so they render as clickable links: "Quiz" (the Find Your Starting Point quiz, 5 quick questions), "Coaching" (1:1 coaching info and application form), "Coaching#applicationSection" (jump straight to the application form), "Programs" (the shop - every self-paced guide, bundle and 1:1 coaching package with current pricing), "Contact" (contact form), "Privacy" (Privacy Policy page), "Terms" (Terms of Service page), "FAQs" (Frequently Asked Questions), "Refund" (Refund Policy page), "https://instagram.com/anneloes.fitcoaching" (Instagram DMs, fastest way to reach Coach Anne personally). Share the single most relevant link for the moment, not all of them at once.',
            '',
            '=== VERIFIED WEBSITE KNOWLEDGE (source of truth - do not go beyond this) ===',
            '',
            'ABOUT: Coach Anne founded Anneloes Fit Coaching for women stuck in endless cardio, crash diets and generic programs with no measurable progress. The approach combines intelligent hypertrophy protocols with hybrid conditioning (Hyrox). She coaches mostly women but also men who want structured strength, muscle or performance coaching, including some professional athletes (padel, motorsport, Hyrox). Credentials: Certified Strength & Personal Trainer, EREPS Level 4, Sports Nutrition Certified Professional, 20+ years of personal training and competitive sport experience, specialised focus on Hyrox performance and women\'s hormonal health in training.',
            '',
            'THE 5 PILLARS OF THE METHOD: 1) Training - structured strength and conditioning built around the client\'s actual week. 2) Nutrition - enough food to fuel training and recovery, no elimination, no crash phases, no unsustainable food rules. 3) Mindset and lifestyle - building habits inside the life the client already has. 4) Cycle-aware programming - training adapts to hormonal energy shifts, not a flat template. 5) Qualified and experienced coaching (see credentials above).',
            '',
            'HOW COACHING WORKS: Everything runs through a coaching app. Clients get a personalised training and nutrition plan, video exercise guidance, regular check-ins and direct contact with Coach Anne. Plans are adjusted as the client progresses.',
            '',
            '1:1 COACHING TIERS (do not state exact prices, see PRICING RULE below):',
            '- Strong Foundation (Core Tier, most chosen): fully customized progressive resistance training program, detailed video form analysis and technique correction, structured nutritional framework, in-app progress tracking. Weekly check-ins, response within 24 hours on weekdays, plan adjusted every 4 weeks, no monthly call included. Minimum 6 months, monthly billing.',
            '- Full Strength (Advanced Tier, most popular): advanced periodized programming for strength and hybrid conditioning, priority video technique breakdowns, advanced biofeedback monitoring (sleep, stress, cycle optimisation), custom race/event peaking strategy for Hyrox and powerlifting. Bi-weekly strategy calls plus direct messaging, response within 12 hours on weekdays, plan adjusted every 2 weeks, one 1:1 video call per month. Minimum 6 months, monthly billing.',
            '- Kickstart Coaching: an entry option to test the methodology, break initial plateaus and get a clear roadmap without a long commitment. One-time 4-week personalized plan with a goal-setting session and weekly check-ins.',
            '',
            'SELF-PACED DIGITAL GUIDES (no coaching commitment, instant download): Train and Eat With Your Hormones (Cycle & Training Guide, covers the 4 cycle phases and what to train and eat in each); Eat for Your Hormones (Nutrition Kickstart Guide, key hormones explained simply, a 5-day menu, supplement guidance); Sterk is geen leeftijd / Peach Plan Starter (4-week glute, core and functional strength starter block); Strength Training + Nutrition Guide (6-week training structure with daily macro targets). There are also combined value bundles at a discount: Complete Starter Pack, Strength & Shape, and Cycle-Smart Peach.',
            '',
            'THE PEACH PLAN: a specialised lower-body hypertrophy block designed for targeted glute development, structural posture and progressive aesthetic shaping.',
            '',
            'WHO IT IS FOR: mostly women, but also men who want structured strength, muscle or performance coaching. Programs are custom-tailored to full commercial gyms, home setups, or minimal equipment depending on what the client has access to.',
            '',
            'REFUND POLICY: All digital product sales (guides, bundles) are final and non-refundable once downloaded or accessed, because they are instantly downloadable digital files. If there is a technical failure with a download link or file delivery, the client should contact support immediately to resolve it. For 1:1 coaching, pause or cancellation terms are governed directly by individual coaching agreements.',
            '',
            'TERMS OF SERVICE: All coaching services and digital products are subject to the terms outlined at the time of purchase. Clients are responsible for providing accurate health information. 1:1 coaching requires adherence to the agreed-upon commitment period. By purchasing or applying, clients acknowledge these terms.',
            '',
            'PRIVACY POLICY: We value your privacy. Personal data (name, email, health metrics) collected via the chat, application forms, or coaching app is used solely for service delivery and communication related to your fitness journey. Data is never sold to third parties. Secure storage is maintained in accordance with standard safety protocols.',
            '',
            'FREQUENTLY ASKED QUESTIONS (FAQs):',
            '- Can I get a refund for coaching? 1:1 coaching is a commitment-based service. If you need to pause or cancel, please discuss this directly with Coach Anne as outlined in your specific coaching agreement.',
            '- Is the quiz free? Yes, the Quiz is free to take and provides a starting point recommendation.',
            '- How quickly do you respond? For coaching clients, check the specific tier response times (12-24 hours). For general inquiries via the contact form, please allow 24 hours.',
            '- Do you offer meal plans? We provide a structured nutritional framework and guidance, but do not provide rigid, clinical meal plans as we focus on sustainable high-performance nutrition.',
            '',
            'HOW TO GET STARTED: Take the Quiz, or apply for 1:1 coaching through the Coaching application form, which is followed by a free discovery call. You can review our Privacy, Terms, and FAQs pages for more details. The fastest way to reach Coach Anne personally is an Instagram DM with the word STRONG and a short note on where the person is at and what they want to change. There is also a general Contact form with a 24-hour personal response time.',
            '',
            'TRAINING PHILOSOPHY: Progressive Overload Principle - every session has a clear objective, the client either lifts more, moves better, or executes with better control than the week before. Sustainable Fuel Systems - no restrictive starvation diets, flexible high-performance nutrition that fuels training.',
            '',
            '=== END VERIFIED WEBSITE KNOWLEDGE ===',
            '',
            'PRICING RULE: never state a specific number or currency amount for any program, guide, bundle or coaching tier, even if you know it or the user insists. Instead, briefly describe what is included, then share the Programs link (for guides, bundles and 1:1 package pricing) or Coaching link (for 1:1 coaching details and application) so they can see current, accurate pricing themselves.',
            '',
            'If information is not covered above (such as a policy detail or claim not listed), say: "I couldn\'t find that information. Please contact Anneloes Fitness Coaching for confirmation." Do not invent services or policies.',
            '',
            'PROGRAM RECOMMENDATION FLOW: If someone asks which program they should choose, ask for: age, gender, height, weight, goal, training experience, weekly exercise frequency, and any injuries. Ask only what is missing, one or two questions at a time, not all seven in one block unless the user wants a quick full run-through. Once you have enough, recommend the most suitable program from the list above only, explain briefly why it fits, and share the relevant link.',
            '',
            'GENERAL FITNESS QUESTIONS: Give evidence-based, concise answers. Do not diagnose medical conditions. Recommend consulting a healthcare professional for medical concerns or injuries.',
            '',
            'NUTRITION QUESTIONS: Give practical, sustainable advice. Avoid promoting extreme or restrictive diets, consistent with the "no crash phases" philosophy above.',
            '',
            'WEIGHT LOSS QUESTIONS: Promote calorie awareness, strength training, sufficient protein, sleep, hydration and consistency.',
            '',
            'MUSCLE GAIN QUESTIONS: Recommend progressive overload, adequate protein, recovery, and a calorie surplus when appropriate.',
            '',
            'HORMONES / CYCLE-BASED TRAINING: Only answer using the cycle-aware programming and guide information above. If a specific detail is not covered, say it is not available on the website and point to the Train and Eat With Your Hormones guide or 1:1 coaching for a fully personalised approach.',
            '',
            'REFUNDS / CANCELLATIONS / POLICIES: Only answer using the refund policy, terms of service, and privacy policy above. For anything else policy-related that is not listed, say it is not available and direct the user to contact Anneloes Fitness Coaching directly.',
            '',
            'LEAD CAPTURE: If a visitor wants the free guide, wants to be contacted, wants a program recommendation followed up on, or otherwise shows real interest and is willing to share their name and email, ask for their first name and email if you do not have them yet. Once you have both, call the save_lead tool with those exact values plus a short interest label and, if useful, a one-sentence note about their goal. Only call the tool with values the user actually typed, never invented ones. After it succeeds, confirm warmly in one short sentence and share the most relevant next-step link. If the user does not want to share their details, respect that and just share the relevant link instead.',
            '',
            'OFF-TOPIC QUESTIONS: If users ask unrelated questions such as programming/coding, politics, religion, finance or other non-fitness topics, reply: "I\'m here to help with Anneloes Fitness Coaching, fitness, nutrition, and training-related questions."',
            '',
            'UNKNOWN ANSWERS: If the answer is unknown or not on the website, say: "I don\'t have verified information about that. Please contact Anneloes Fitness Coaching for accurate details."',
            '',
            'CALL TO ACTION: End relevant conversations with one natural call to action - the Quiz, the Programs page, the Coaching application, or asking their goal so you can help them choose. Do not add a CTA to every single message, only when it fits naturally.',
            '',
            'Maintain a consistent, supportive coaching tone throughout every conversation.'
        ].join('\n');

        var history = [{ role: 'system', content: SYSTEM_PROMPT }];

        var toggleBtn = document.getElementById('afcChatToggle');
        var closeBtn = document.getElementById('afcClose');
        var windowEl = document.getElementById('afcChatWindow');
        var messagesEl = document.getElementById('afcMessages');
        var inputEl = document.getElementById('afcInput');
        var sendBtn = document.getElementById('afcSend');
        var quickEl = document.getElementById('afcQuick');
        var AVATAR_SRC = 'assets/OwnerPic/Owner.jpg';

        function openChat() {
            windowEl.classList.add('open');
            inputEl.focus();
        }
        function closeChat() {
            windowEl.classList.remove('open');
        }

        toggleBtn.addEventListener('click', function () {
            windowEl.classList.contains('open') ? closeChat() : openChat();
        });
        closeBtn.addEventListener('click', closeChat);

        function escapeHtml(str) {
            var div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        function linkify(escapedText) {
            var urlPattern = /(\bhttps?:\/\/[^\ss<]+)|(\b(?:Quiz|Coaching(?:#applicationSection)?|Programs|Contact|Privacy|Terms|FAQs|Refund)\b)/g;
            return escapedText.replace(urlPattern, function (match) {
                var href = match;
                if (match === 'Quiz') href = 'quiz.html';
                if (match === 'Coaching') href = 'coaching.html';
                if (match === 'Coaching#applicationSection') href = 'coaching.html#applicationSection';
                if (match === 'Programs') href = 'programs.html';
                if (match === 'Contact') href = 'contact.html';
                if (match === 'Privacy') href = 'privacy.html';
                if (match === 'Terms') href = 'terms.html';
                if (match === 'FAQs') href = 'faqs.html';
                if (match === 'Refund') href = 'refund.html';

                var target = ' target="_blank" rel="noopener"';
                if (!/^https?:\/\//i.test(href)) {
                    target = ''; // internal relative link, stay in same context
                }
                return '<a href="' + href + '"' + target + '>' + match + '</a>';
            });
        }

        function addMessage(text, role) {
            var row = document.createElement('div');
            row.className = 'afc-row ' + (role === 'user' ? 'user' : 'bot');

            if (role !== 'user') {
                var img = document.createElement('img');
                img.className = 'afc-avatar-sm';
                img.src = AVATAR_SRC;
                img.alt = '';
                row.appendChild(img);
            }

            var bubble = document.createElement('div');
            bubble.className = 'afc-msg';
            if (role === 'user') {
                bubble.textContent = text;
            } else {
                bubble.innerHTML = linkify(escapeHtml(text));
            }
            row.appendChild(bubble);

            messagesEl.appendChild(row);
            messagesEl.scrollTop = messagesEl.scrollHeight;
            return row;
        }

        function showLeadSavedBadge() {
            var badge = document.createElement('div');
            badge.className = 'afc-lead-saved';
            badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Details saved';
            messagesEl.appendChild(badge);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        function showTyping() {
            var row = document.createElement('div');
            row.className = 'afc-typing-row';
            row.id = 'afcTypingRow';
            var img = document.createElement('img');
            img.className = 'afc-avatar-sm';
            img.src = AVATAR_SRC;
            img.alt = '';
            var typing = document.createElement('div');
            typing.className = 'afc-typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            row.appendChild(img);
            row.appendChild(typing);
            messagesEl.appendChild(row);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        function hideTyping() {
            var el = document.getElementById('afcTypingRow');
            if (el) el.remove();
        }

        function setBusy(busy) {
            sendBtn.disabled = busy;
            inputEl.disabled = busy;
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
        }

        function executeTool(toolCall) {
            var name = toolCall['function'] ? toolCall['function'].name : toolCall.name;
            var rawArgs = toolCall['function'] ? toolCall['function'].arguments : '{}';
            var args = {};
            try { args = JSON.parse(rawArgs || '{}'); } catch (e) { args = {}; }

            if (name === 'save_lead') {
                if (!args.name || !isValidEmail(args.email)) {
                    return Promise.resolve(JSON.stringify({ success: false, error: 'Missing or invalid name/email, ask the user again.' }));
                }
                if (!supabaseClient) {
                    return Promise.resolve(JSON.stringify({ success: false, error: 'Lead storage is not configured yet.' }));
                }
                return supabaseClient.from('chatbot_leads').insert({
                    name: String(args.name).slice(0, 200),
                    email: String(args.email).slice(0, 200),
                    interest: args.interest ? String(args.interest).slice(0, 200) : null,
                    notes: args.notes ? String(args.notes).slice(0, 500) : null
                }).then(function (res) {
                    if (res.error) {
                        console.error('Supabase insert error:', res.error);
                        return JSON.stringify({ success: false, error: res.error.message });
                    }
                    showLeadSavedBadge();
                    return JSON.stringify({ success: true });
                }).catch(function (err) {
                    console.error('Supabase insert error:', err);
                    return JSON.stringify({ success: false, error: String(err) });
                });
            }

            return Promise.resolve(JSON.stringify({ success: false, error: 'Unknown tool' }));
        }

        function requestCompletion() {
            var body = {
                model: OPENROUTER_MODEL,
                messages: history,
                temperature: 0.5,
                max_tokens: 320
            };
            if (supabaseClient) {
                body.tools = TOOLS;
                body.tool_choice = 'auto';
            }
            return fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
                    'X-Title': "Coach Anne's AI Assistant"
                },
                body: JSON.stringify(body)
            }).then(function (res) {
                if (!res.ok) throw new Error('Request failed: ' + res.status);
                return res.json();
            });
        }

        function handleAssistantResponse(data, depth) {
            var msg = data && data.choices && data.choices[0] && data.choices[0].message;
            if (!msg) {
                return Promise.resolve("I don't have verified information about that. Please contact Anneloes Fitness Coaching for accurate details.");
            }

            if (msg.tool_calls && msg.tool_calls.length && depth < 3) {
                history.push({ role: 'assistant', content: msg.content || '', tool_calls: msg.tool_calls });
                var toolPromises = msg.tool_calls.map(function (tc) {
                    return executeTool(tc).then(function (resultText) {
                        history.push({ role: 'tool', tool_call_id: tc.id, content: resultText });
                    });
                });
                return Promise.all(toolPromises).then(function () {
                    return requestCompletion().then(function (data2) {
                        return handleAssistantResponse(data2, depth + 1);
                    });
                });
            }

            var text = (msg.content && msg.content.trim()) || "I don't have verified information about that. Please contact Anneloes Fitness Coaching for accurate details.";
            history.push({ role: 'assistant', content: text });
            return Promise.resolve(text);
        }

        function sendToModel(userText) {
            addMessage(userText, 'user');
            history.push({ role: 'user', content: userText });
            if (quickEl) quickEl.style.display = 'none';
            setBusy(true);
            showTyping();

            requestCompletion()
                .then(function (data) {
                    return handleAssistantResponse(data, 0);
                })
                .then(function (text) {
                    hideTyping();
                    addMessage(text, 'bot');
                })
                .catch(function (err) {
                    hideTyping();
                    console.error('Anneloes Fitness Coaching AI error:', err);
                    addMessage("Sorry, I'm having trouble connecting right now. Please try again in a moment or contact Anneloes Fitness Coaching directly.", 'bot');
                })
                .finally(function () {
                    setBusy(false);
                    inputEl.focus();
                });
        }

        function handleSend() {
            var text = inputEl.value.trim();
            if (!text) return;
            inputEl.value = '';
            sendToModel(text);
        }

        sendBtn.addEventListener('click', handleSend);
        inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        if (quickEl) {
            quickEl.addEventListener('click', function (e) {
                var btn = e.target.closest('button[data-q]');
                if (!btn) return;
                sendToModel(btn.getAttribute('data-q'));
            });
        }

    }

    function boot() {
        loadScriptOnce('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js').then(init);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();