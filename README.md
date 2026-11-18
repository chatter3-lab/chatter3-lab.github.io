# Chatter3 engineering notes

The engineering log of [Chatter3](https://app.chatter3.com), a free 1-on-1
English conversation app — the [web app](https://app.chatter3.com) and the
[HarmonyOS build](https://appgallery.huawei.com) on Huawei AppGallery. Six
bugs that reached production, each with the symptom, the cause, the fix and
the test that keeps it fixed.

The site is plain HTML and one stylesheet. There is no build step, no
framework, no font from a CDN and no analytics script — the notes have to be
readable from a phone in mainland China, where Google Fonts is not reachable
and where a page that waits on a third party is a page that does not arrive.

## The notes

| Page | What it is about |
| --- | --- |
| `/arkweb-freeze/` | A share button froze the HarmonyOS app: a window request answered with a controller that no component rendered |
| `/camera-permission/` | The camera was granted and the app still said it was denied: two permissions, one unanswered callback |
| `/durable-object-peer-loss/` | A Cloudflare Durable Object forgot one of the two WebSockets when it was evicted |
| `/route-order/` | A generic route swallowed the GDPR export request in a single-file Worker |
| `/peer-not-joined/` | The app blamed the user's network when the partner never arrived |
| `/call-clock/` | The countdown started before the call did, and a sign error made two phones disagree |
| `/data/` | The first 133 sessions, the method and the limits of the data |
| `/zh/` | The same index in Chinese |

## Publishing

The site is served by GitHub Pages from the `main` branch, at
`https://chatter3-lab.github.io`. Push to `main` and it is live.

## The app these notes are about

[app.chatter3.com](https://app.chatter3.com) is the live web app — sign in
with an email address, get matched with a partner for a one-to-one video
conversation, and it is free. The same build is on
[Huawei AppGallery](https://appgallery.huawei.com) as a HarmonyOS app, which
is where the ArkWeb and permission notes came from. The marketing site is
[chatter3.com](https://chatter3.com).

## The code is open source

The clock of the call — the module behind the `/call-clock/` note — is
published on its own, because it is the kind of thing every video-call app
needs and most of them get wrong:

**[chatter3-lab/chatter3-call-clock](https://github.com/chatter3-lab/chatter3-call-clock)**

It is the same file the app runs, with the same tests, MIT licensed and
without dependencies. `npm install chatter3-call-clock`, or read the source
and the test that caught the sign error.

## Telling Bing about a change

GitHub Pages submits nothing by itself, so after every change to a note
the pages have to be handed to the engines that speak IndexNow:

```
node tools/submit-indexnow.mjs               every page
node tools/submit-indexnow.mjs /call-clock/  one page
```

The key is in the root of the site (`{key}.txt`, the name the protocol
asks for) and in `indexnow.key` for the script. No account and no API key
is needed: the key file on the site is the proof. The answer is printed —
`200` accepted, `202` accepted and still being checked.

The site was added to Bing Webmaster Tools on 17 November 2026 with its
own verified property (`BingSiteAuth.xml` in the root), and its sitemap
was submitted there.

Baidu does not speak IndexNow. The way in for Baidu is the ordinary
submission in 百度站长平台, once the property exists.

## Writing a note

1. Start from the symptom. It is the part that is hard to reproduce later.
2. Quote the code that runs, not the code that was intended.
3. Say what you could not test. A note that hides the untested part is a
   marketing page.
4. Keep the numbers with their limits attached: the sample size, the date,
   and the query that produced them.
5. No third-party resources. One stylesheet, no fonts, no scripts but the one
   that opens the hero.

## Licence

The code excerpts are from the Chatter3 repositories and are published under
the same terms as the rest of the project.
