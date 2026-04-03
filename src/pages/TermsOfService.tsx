import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const TOC_ITEMS = [
  { id: "agreement", label: "Agreement to Legal Terms" },
  { id: "our-services", label: "Our Services" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "user-representations", label: "User Representations" },
  { id: "prohibited-activities", label: "Prohibited Activities" },
  { id: "user-contributions", label: "User Contributions" },
  { id: "contribution-license", label: "Contribution License" },
  { id: "services-management", label: "Services Management" },
  { id: "termination", label: "Term and Termination" },
  { id: "modifications", label: "Modifications" },
  { id: "governing-law", label: "Governing Law" },
  { id: "dispute-resolution", label: "Dispute Resolution" },
  { id: "corrections", label: "Corrections" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "limitations", label: "Limitations of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "user-data", label: "User Data" },
  { id: "electronic-communications", label: "Electronic Communications" },
  { id: "miscellaneous", label: "Miscellaneous" },
  { id: "contact", label: "Contact Us" },
];

export default function TermsOfService() {
  return (
    <>
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Terms of Use</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">TERMS OF USE</h1>
          <p className="text-muted-foreground">Last updated January 07, 2026</p>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex gap-8 max-w-6xl mx-auto px-4 py-12">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-20 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Contents</p>
            <ul className="space-y-1">
              {TOC_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <article className="flex-1 max-w-3xl">
          <section id="agreement" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">AGREEMENT TO OUR LEGAL TERMS</h2>
            <div className="space-y-4 text-foreground/80">
              <p>We are Genzoic Inc ("Company," "we," "us," "our").</p>
              <p>
                We operate the Genzoic Enterprise AI Assistant, as well as any other related products and services that
                refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
              </p>
              <p>
                You can contact us by email at{" "}
                <a href="mailto:info@genzoic.com" className="text-primary hover:underline">
                  info@genzoic.com
                </a>
                .
              </p>
              <p>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on
                behalf of an entity ("you"), and Genzoic Inc, concerning your access to and use of the Services. You
                agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these
                Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM
                USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              <p>
                Supplemental terms and conditions or documents that may be posted on the Services from time to time are
                hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make
                changes or modifications to these Legal Terms at any time and for any reason. We will alert you about
                any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive
                specific notice of each such change. It is your responsibility to periodically review these Legal Terms
                to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and
                to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the
                date such revised Legal Terms are posted.
              </p>
              <p>We recommend that you print a copy of these Legal Terms for your records.</p>
            </div>
          </section>

          <section id="our-services" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">1. OUR SERVICES</h2>
            <p className="text-foreground/80">
              The information provided when using the Services is not intended for distribution to or use by any person
              or entity in any jurisdiction or country where such distribution or use would be contrary to law or
              regulation or which would subject us to any registration requirement within such jurisdiction or country.
              Accordingly, those persons who choose to access the Services from other locations do so on their own
              initiative and are solely responsible for compliance with local laws, if and to the extent local laws are
              applicable.
            </p>
          </section>

          <section id="intellectual-property" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">2. INTELLECTUAL PROPERTY RIGHTS</h2>

            <h3 className="text-lg font-semibold text-foreground mb-4">Our intellectual property</h3>
            <div className="space-y-4 text-foreground/80 mb-6">
              <p>
                We are the owner or the licensee of all intellectual property rights in our Services, including all
                source code, databases, functionality, software, website designs, audio, video, text, photographs, and
                graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and
                logos contained therein (the "Marks").
              </p>
              <p>
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual
                property rights and unfair competition laws) and treaties around the world.
              </p>
              <p>
                The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial
                use or internal business purpose only.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-4">Your use of our Services</h3>
            <div className="space-y-4 text-foreground/80 mb-6">
              <p>
                Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below,
                we grant you a non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
              </ul>
              <p>solely for your personal, non-commercial use or internal business purpose.</p>
              <p>
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no
                Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly
                displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any
                commercial purpose whatsoever, without our express prior written permission.
              </p>
              <p>
                If you wish to make any use of the Services, Content, or Marks other than as set out in this section or
                elsewhere in our Legal Terms, please address your request to:{" "}
                <a href="mailto:info@genzoic.com" className="text-primary hover:underline">
                  info@genzoic.com
                </a>
                . If we ever grant you the permission to post, reproduce, or publicly display any part of our Services
                or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and
                ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or
                displaying our Content.
              </p>
              <p>We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>
              <p>
                Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms
                and your right to use our Services will terminate immediately.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-4">Your submissions</h3>
            <div className="space-y-4 text-foreground/80">
              <p>
                Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services
                to understand the (a) rights you give us and (b) obligations you have when you post or upload any
                content through the Services.
              </p>
              <p>
                <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback,
                or other information about the Services ("Submissions"), you agree to assign to us all intellectual
                property rights in such Submission. You agree that we shall own this Submission and be entitled to its
                unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without
                acknowledgment or compensation to you.
              </p>
              <p>
                <strong>You are responsible for what you post or upload:</strong> By sending us Submissions through any
                part of the Services you:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send,
                  publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful,
                  harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group,
                  sexually explicit, false, inaccurate, deceitful, or misleading;
                </li>
                <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
                <li>
                  warrant that any such Submission are original to you or that you have the necessary rights and
                  licenses to submit such Submissions and that you have full authority to grant us the above-mentioned
                  rights in relation to your Submissions; and
                </li>
                <li>warrant and represent that your Submissions do not constitute confidential information.</li>
              </ul>
              <p>
                You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all
                losses that we may suffer because of your breach of (a) this section, (b) any third party's intellectual
                property rights, or (c) applicable law.
              </p>
            </div>
          </section>

          <section id="user-representations" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">3. USER REPRESENTATIONS</h2>
            <div className="space-y-4 text-foreground/80">
              <p>By using the Services, you represent and warrant that:</p>
              <ol className="list-decimal list-inside ml-4 space-y-2">
                <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
                <li>you are not a minor in the jurisdiction in which you reside;</li>
                <li>
                  you will not access the Services through automated or non-human means, whether through a bot, script
                  or otherwise;
                </li>
                <li>you will not use the Services for any illegal or unauthorized purpose; and</li>
                <li>your use of the Services will not violate any applicable law or regulation.</li>
              </ol>
              <p>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right
                to suspend or terminate your account and refuse any and all current or future use of the Services (or
                any portion thereof).
              </p>
            </div>
          </section>

          <section id="prohibited-activities" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">4. PROHIBITED ACTIVITIES</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                You may not access or use the Services for any purpose other than that for which we make the Services
                available. The Services may not be used in connection with any commercial endeavors except those that
                are specifically endorsed or approved by us.
              </p>
              <p>As a user of the Services, you agree not to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  Systematically retrieve data or other content from the Services to create or compile, directly or
                  indirectly, a collection, compilation, database, or directory without written permission from us.
                </li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
                  information such as user passwords.
                </li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                <li>Engage in unauthorized framing of or linking to the Services.</li>
                <li>Upload or transmit viruses, Trojan horses, or other material.</li>
                <li>Engage in any automated use of the system, such as scripts, robots, or scrapers.</li>
                <li>Delete copyright or proprietary notices.</li>
                <li>Attempt to impersonate another user or person.</li>
                <li>Upload or transmit spyware, web bugs, cookies, or similar devices.</li>
                <li>Interfere with, disrupt, or create an undue burden on the Services.</li>
                <li>Harass, annoy, intimidate, or threaten employees or agents.</li>
                <li>Attempt to bypass access restrictions.</li>
                <li>Copy or adapt the Services' software.</li>
                <li>Reverse engineer the Services.</li>
                <li>Use automated systems to access the Services.</li>
                <li>Use a buying agent to make purchases.</li>
                <li>Collect usernames or email addresses for unsolicited email.</li>
                <li>Use the Services to compete with us.</li>
              </ul>
            </div>
          </section>

          <section id="user-contributions" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">5. USER GENERATED CONTRIBUTIONS</h2>
            <p className="text-foreground/80">
              The Services does not offer users to submit or post content. We may provide you with the opportunity to
              create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials
              to us or on the Services, including but not limited to text, writings, video, audio, photographs,
              graphics, comments, suggestions, or personal information (collectively, "Contributions").
            </p>
          </section>

          <section id="contribution-license" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">6. CONTRIBUTION LICENSE</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                You and Services agree that we may access, store, process, and use any information and personal data
                that you provide.
              </p>
              <p>By submitting feedback, you agree that we can use and share such feedback without compensation.</p>
              <p>We do not assert ownership over your Contributions.</p>
            </div>
          </section>

          <section id="services-management" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">7. SERVICES MANAGEMENT</h2>
            <p className="text-foreground/80">
              We reserve the right, but not the obligation, to monitor the Services, take legal action, restrict access,
              remove content, or otherwise manage the Services to protect our rights and ensure proper functioning.
            </p>
          </section>

          <section id="termination" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">8. TERM AND TERMINATION</h2>
            <p className="text-foreground/80">
              These Legal Terms shall remain in full force and effect while you use the Services. We reserve the right
              to deny access, terminate accounts, or delete content at any time without notice.
            </p>
          </section>

          <section id="modifications" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">9. MODIFICATIONS AND INTERRUPTIONS</h2>
            <p className="text-foreground/80">
              We reserve the right to modify or discontinue the Services without notice. We are not liable for
              interruptions or unavailability.
            </p>
          </section>

          <section id="governing-law" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">10. GOVERNING LAW</h2>
            <p className="text-foreground/80">
              These Legal Terms shall be governed by and defined following the laws of the State of Delaware, United
              States. Genzoic Inc and yourself irrevocably consent that the courts of Delaware shall have exclusive
              jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
            </p>
          </section>

          <section id="dispute-resolution" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">11. DISPUTE RESOLUTION</h2>

            <h3 className="text-lg font-semibold text-foreground mb-4">Informal Negotiations</h3>
            <p className="text-foreground/80 mb-6">
              The Parties agree to attempt informal negotiation for at least thirty (30) days before initiating
              arbitration.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-4">Binding Arbitration</h3>
            <p className="text-foreground/80 mb-6">
              Disputes shall be resolved by the International Commercial Arbitration Court under the European
              Arbitration Chamber.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-4">Restrictions</h3>
            <p className="text-foreground/80 mb-6">No class actions or consolidated arbitration.</p>

            <h3 className="text-lg font-semibold text-foreground mb-4">Exceptions</h3>
            <p className="text-foreground/80">Certain disputes are excluded from arbitration.</p>
          </section>

          <section id="corrections" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">12. CORRECTIONS</h2>
            <p className="text-foreground/80">
              There may be information on the Services that contains typographical errors, inaccuracies, or omissions,
              including descriptions, pricing, availability, and various other information. We reserve the right to
              correct any errors, inaccuracies, or omissions and to change or update the information on the Services at
              any time, without prior notice.
            </p>
          </section>

          <section id="disclaimer" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">13. DISCLAIMER</h2>
            <div className="p-6 bg-muted rounded-lg space-y-4">
              <p className="text-foreground/80 text-sm uppercase">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES
                WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
                OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-foreground/80 text-sm uppercase">
                WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT
                OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO
                LIABILITY OR RESPONSIBILITY FOR ANY:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-foreground/80 text-sm uppercase">
                <li>ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,</li>
                <li>
                  PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE
                  OF THE SERVICES,
                </li>
                <li>
                  ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
                  AND/OR FINANCIAL INFORMATION STORED THEREIN,
                </li>
                <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES,</li>
                <li>
                  ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY
                  ANY THIRD PARTY, AND/OR
                </li>
                <li>
                  ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED
                  AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE
                  SERVICES.
                </li>
              </ul>
              <p className="text-foreground/80 text-sm uppercase">
                WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED
                OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
                APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY
                BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
                SERVICES.
              </p>
              <p className="text-foreground/80 text-sm uppercase">
                AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE
                YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
              </p>
            </div>
          </section>

          <section id="limitations" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">14. LIMITATIONS OF LIABILITY</h2>
            <div className="p-6 bg-muted rounded-lg space-y-4">
              <p className="text-foreground/80 text-sm uppercase">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
                DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
                PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE
                HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-foreground/80 text-sm uppercase">
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE
                WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE
                AMOUNT PAID, IF ANY, BY YOU TO US OR $100.00 USD.
              </p>
              <p className="text-foreground/80 text-sm uppercase">
                CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE
                EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
                DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
              </p>
            </div>
          </section>

          <section id="indemnification" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">15. INDEMNIFICATION</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all
                of our respective officers, agents, partners, and employees, from and against any loss, damage,
                liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party
                due to or arising out of:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>use of the Services;</li>
                <li>breach of these Legal Terms;</li>
                <li>any breach of your representations and warranties set forth in these Legal Terms;</li>
                <li>
                  your violation of the rights of a third party, including but not limited to intellectual property
                  rights; or
                </li>
                <li>
                  any overt harmful act toward any other user of the Services with whom you connected via the Services.
                </li>
              </ul>
              <p>
                Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense
                and control of any matter for which you are required to indemnify us, and you agree to cooperate, at
                your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such
                claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
              </p>
            </div>
          </section>

          <section id="user-data" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">16. USER DATA</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                We will maintain certain data that you transmit to the Services for the purpose of managing the
                performance of the Services, as well as data relating to your use of the Services. Although we perform
                regular routine backups of data, you are solely responsible for all data that you transmit or that
                relates to any activity you have undertaken using the Services.
              </p>
              <p>
                You agree that we shall have no liability to you for any loss or corruption of any such data, and you
                hereby waive any right of action against us arising from any such loss or corruption of such data.
              </p>
            </div>
          </section>

          <section id="electronic-communications" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              17. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
            </h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                Visiting the Services, sending us emails, and completing online forms constitute electronic
                communications. You consent to receive electronic communications, and you agree that all agreements,
                notices, disclosures, and other communications we provide to you electronically, via email and on the
                Services, satisfy any legal requirement that such communication be in writing.
              </p>
              <p className="text-sm uppercase font-medium">
                YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO
                ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR
                VIA THE SERVICES.
              </p>
              <p>
                You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or
                other laws in any jurisdiction which require an original signature or delivery or retention of
                non-electronic records, or to payments or the granting of credits by any means other than electronic
                means.
              </p>
            </div>
          </section>

          <section id="miscellaneous" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">18. MISCELLANEOUS</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the
                Services constitute the entire agreement and understanding between you and us.
              </p>
              <p>
                Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a
                waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law.
              </p>
              <p>
                We may assign any or all of our rights and obligations to others at any time. We shall not be
                responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our
                reasonable control.
              </p>
              <p>
                If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or
                unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and
                does not affect the validity and enforceability of any remaining provisions.
              </p>
              <p>
                There is no joint venture, partnership, employment or agency relationship created between you and us as
                a result of these Legal Terms or use of the Services.
              </p>
              <p>
                You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You
                hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and
                the lack of signing by the parties hereto to execute these Legal Terms.
              </p>
            </div>
          </section>

          <section id="contact" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">19. CONTACT US</h2>
            <p className="text-foreground/80 mb-6">
              In order to resolve a complaint regarding the Services or to receive further information regarding use of
              the Services, please contact us at:
            </p>
            <div className="p-6 bg-card border border-border rounded-lg space-y-2">
              <p className="text-foreground">
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:info@genzoic.com" className="text-primary hover:underline">
                  info@genzoic.com
                </a>
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Company:</span> Genzoic Inc.
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Location:</span> United States
              </p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
