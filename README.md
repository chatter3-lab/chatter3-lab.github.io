# Chatter3 engineering notes

The engineering log of [Chatter3](https://chatter3.com), a free 1-on-1 English
conversation app. Six bugs that reached production, each with the symptom, the
cause, the fix and the test that keeps it fixed.

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
