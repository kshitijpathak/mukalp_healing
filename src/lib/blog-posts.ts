export type BlogBlock = {
  heading?: string
  text: string
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  excerpt: string
  body: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "you-keep-giving",
    title: "You Keep Giving. But What Happens When There's Nothing Left for You?",
    category: "Emotional wellbeing",
    date: "August 20, 2026",
    readTime: "6 min read",
    image: "/images/blog/emptyness_image_blog.jpg",
    imageAlt: "Wooden figures representing different levels of emotional energy",
    excerpt:
      "Maybe you're the person everyone comes to. You listen, you help, you adjust. And because you're so used to being there for everyone else, you may not realise you've slowly stopped being there for yourself.",
    body: [
      {
        text: "Maybe you're the person everyone comes to.",
      },
      {
        text: "You listen. You help. You understand. You adjust. You keep things together.",
      },
      {
        text: "And because you're so used to being there for everyone else, you may not even realise that you've slowly stopped being there for yourself.",
      },
      {
        text: "Until one day, you feel strangely tired.",
      },
      {
        text: "Not just physically.",
      },
      {
        text: "You feel disconnected. Irritated. Unmotivated. Restless. Empty.",
      },
      {
        text: "And you wonder:",
      },
      {
        text: "\"Why do I feel this way when everything is technically okay?\"",
      },
      {
        text: "Maybe nothing is wrong with you.",
      },
      {
        text: "Maybe you've simply been giving from a cup that hasn't been filled in a long time.",
      },
      {
        heading: "So, where do you begin?",
        text: "",
      },
      {
        heading: "1. Stop asking, \"What do they need from me?\"",
        text: "And start asking: \"What is happening inside me?\" Before responding to another person, pause. Am I tired? Am I overwhelmed? Am I angry? Do I actually want to do this? This small pause helps you notice yourself before you automatically put everyone else first.",
      },
      {
        heading: "2. Learn to recognise what your emotions are trying to tell you.",
        text: "Your irritation may be saying, \"I need a break.\" Your resentment may be saying, \"I have been giving too much.\" Your emptiness may be saying, \"I haven't felt connected to myself in a while.\" Your constant need for distraction may be saying, \"There is something inside me I haven't made space for.\" You don't always need to get rid of an emotion. Sometimes, you need to listen to it.",
      },
      {
        heading: "3. Find out what actually fills you.",
        text: "Not what looks good on your routine. Not what makes you productive. Not what makes other people happy. What genuinely makes you feel alive? A quiet morning. Movement. Creating something. Being in nature. Having an honest conversation. Doing absolutely nothing. Start noticing. What gives me energy instead of taking it? Then make room for it.",
      },
      {
        heading: "4. Give yourself permission to have needs.",
        text: "You are allowed to need rest. You are allowed to say no. You are allowed to change your mind. You are allowed to ask for help. You are allowed to want something without having a perfect explanation for it. Self-care isn't only about doing more things for yourself. Sometimes it's about stopping the things that continuously take you away from yourself.",
      },
      {
        heading: "5. Build a relationship with yourself: not just a routine for yourself.",
        text: "The goal isn't to become perfectly balanced. It's to know yourself well enough to notice: \"I'm not okay today.\" And instead of abandoning yourself, you stay. You listen. You respond with kindness. You ask: \"What do I need from myself right now?\" That is where the relationship with yourself begins.",
      },
      {
        text: "And maybe this is why you feel the need to get away.",
      },
      {
        text: "Not to escape your life. But to step away from the noise long enough to finally hear yourself.",
      },
      {
        text: "A few days to pause, feel, reconnect and return with something you may have been missing for a long time: yourself.",
      },
      {
        text: "If this is something you have been needing, we invite you to explore our Returning Home to Yourself Wellness Retreat, happening from 2nd to 5th October in Kalgha, Parvati Valley.",
      },
      {
        text: "Take a look at the retreat details, experiences, and itinerary on our website, and see if this journey feels like the space you have been looking for.",
      },
      {
        text: "Sometimes, coming away is not about escaping your life. It is about finding your way back to yourself.",
      },
    ],
  },
]
