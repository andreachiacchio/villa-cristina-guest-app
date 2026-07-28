/* ============================================================================
   VILLA CRISTINA — SERVICES CONFIGURATION
   ----------------------------------------------------------------------------
   This is the only file you need to touch to change the services shown in the
   "Premium Services" section of the app. No HTML, no code.

   To change a price      -> edit `price`
   To change the wording  -> edit `title` / `desc` / `priceNote`
   To hide a service      -> set `enabled: false` (or delete the block)
   To add a service       -> copy any block and change the fields
   To move a service      -> cut and paste it into the other group

   IMPORTANT — every service must show a real price. The house rule for this
   section is: never write "on request" when a price exists.
   ============================================================================ */

/* Transfer routes are declared before the main object so the "from €…" price
   on the Explore the Coast card can be derived from them. Change a route price
   here and both the transfer section and the card follow — they cannot drift
   apart. */
const TRANSFER_ROUTES = [
  {
    id: "naples-airport",
    icon: "✈️",
    name: "Naples Airport",
    sub: "Capodichino (NAP)",
    price: 300,
    durationMin: 90,
    distanceKm: 60
  },
  {
    id: "naples-station",
    icon: "🚉",
    name: "Naples Train Station",
    sub: "Napoli Centrale / Garibaldi",
    price: 300,
    durationMin: 95,
    distanceKm: 62
  },
  {
    id: "sorrento",
    icon: "🌊",
    name: "Sorrento",
    sub: "Town centre / Sorrento Station",
    price: 300,
    durationMin: 60,
    distanceKm: 35
  }
];

const TRANSFER_FROM_PRICE = Math.min(...TRANSFER_ROUTES.map((route) => route.price));

const SERVICES_CONFIG = {

  /* WhatsApp number that receives every "Request" tap (international format,
     no + and no spaces). */
  whatsapp: "393921394070",

  /* WiFi credentials — the only place they appear in the whole app. */
  wifi: {
    ssid: "Villa Cristina wifi",
    password: "Praiano2024"
  },

  /* --------------------------------------------------------------------------
     PRIVATE TRANSFER
     --------------------------------------------------------------------------
     Drives the Private Transfer modal and the "from €…" price on the Explore
     the Coast card. durationMin and distanceKm are indicative: traffic and
     season on the SS163 change the real times a lot.
     -------------------------------------------------------------------------- */
  transfer: {
    perVehicleNote: "Price is per vehicle, not per person",
    routes: TRANSFER_ROUTES,
    capacity: [
      { icon: "👥", label: "Up to 6 passengers", note: "price shown above" },
      { icon: "🚐", label: "Up to 8 — minivan", note: "+€60" }
    ],
    roundTrip: { price: 560, insteadOf: 600 },
    confirmNote: "We confirm within a few hours"
  },

  /* Section heading. The whole guest app is in English — the guests are
     international — so every string a guest can see belongs in English,
     including the group labels below. */
  section: {
    eyebrow: "Premium Services",
    title: "Make your stay effortless",
    subtitle: "Request in one tap on WhatsApp"
  },

  /* --------------------------------------------------------------------------
     CALENDAR-DEPENDENT SERVICES
     --------------------------------------------------------------------------
     Late check-out and early check-in can only be sold when no other booking
     conflicts on that day. Until the Premura calendar is connected, this is a
     manual switch:

        true  -> the service appears in the app
        false -> the service is hidden completely (no greyed-out card,
                 no "ask us", nothing)

     When Premura is connected, it can override these flags at runtime by
     defining window.premuraServiceAvailability(key) -> true | false.
     Nothing else in the app needs to change.
     -------------------------------------------------------------------------- */
  availability: {
    lateCheckout: true,
    earlyCheckin: true
  },

  groups: [

    /* ======================= GROUP 1 — YOUR COMFORT ======================= */
    {
      id: "comfort",
      label: "Your Comfort",
      icon: "✨",
      services: [

        /* Late Check-out leads the section: it is the best seller, so it gets
           the first card and the badge. Both it and Early Check-in carry a
           `requires` flag — see `availability` above — and simply do not
           render on days the calendar can't take them. */

        {
          id: "late-checkout",
          icon: "🕓",
          title: "Late Check-out",
          desc: "Flight in the evening, check-out at 10am? Stay until 4pm.",
          price: "€50",
          priceNote: "per stay · subject to availability · until 4pm",
          badge: "Most requested",
          tone: "sea",
          requires: "lateCheckout",
          waText: "Hello! I'd like to book Late Check-out until 4pm (€50). My check-out date: "
        },

        {
          id: "early-checkin",
          icon: "🔑",
          title: "Early Check-in",
          desc: "Landed early and the room isn't ready? Come in from 12pm.",
          price: "€50",
          priceNote: "per stay · subject to availability · from 12pm",
          tone: "purple",
          requires: "earlyCheckin",
          waText: "Hello! I'd like to book Early Check-in from 12pm (€50). My arrival date: "
        },

        {
          id: "luggage-storage",
          icon: "🧳",
          title: "Luggage Storage",
          desc: "Leave your bags with us after check-out and enjoy the last day.",
          price: "€10",
          priceNote: "per bag · after check-out",
          tone: "sand"
        },

        {
          id: "coastal-wine",
          icon: "🍷",
          title: "Coastal Wine Bottle",
          desc: "A bottle from Furore or Tramonti, chilled and waiting for you.",
          price: "€25",
          priceNote: "per bottle · Furore or Tramonti",
          tone: "terra"
        }

        /* Removed on request: Pre-Arrival Grocery Shop, Delizia al Limone and
           In-Villa Massage. The massage is not to come back — it was dropped
           from Other Experiences too. */

      ]
    },

    /* ==================== GROUP 2 — EXPLORE THE COAST ==================== */
    {
      id: "explore",
      label: "Explore the Coast",
      icon: "🌊",
      services: [

        {
          id: "gozzo-boat",
          icon: "⛵",
          title: "Gozzo Boat Experience",
          desc: "Private gozzo with a local skipper: Capri, caves and swim stops.",
          price: "from €350",
          priceNote: "per boat · all inclusive",
          badge: "Most requested",
          tone: "sea"
        },

        {
          id: "private-transfer",
          icon: "🚗",
          title: "Private Transfer",
          desc: "Door to door from Naples or Sorrento in a 6-seat vehicle.",
          price: `from €${TRANSFER_FROM_PRICE}`,   // derived from `transfer.routes`
          priceNote: "per vehicle · one way",
          tone: "gold"
        },

        {
          id: "private-chef",
          icon: "👨‍🍳",
          title: "Private Chef Dinner",
          desc: "A 4-course dinner cooked on your terrace, sea view included.",
          price: "€85",
          priceNote: "per person · min. 2 · 48h notice",
          tone: "terra"
        }

      ]
    }

  ]
};

/* Hand the configuration to the app. Leave this line at the bottom of the file. */
window.SERVICES_CONFIG = SERVICES_CONFIG;
