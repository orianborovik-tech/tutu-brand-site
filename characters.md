# Tutu Brand — Character Library
> Original stylized-3D animation characters, feature-film craft level · Prompts optimized for **Seedream 4** (stills) + **Seedance 2.0** (video) · Skill: `higgsfield-generate`

Companion document to `environments.md` — every character is native to one or more of the 15 environments and shares the brand palette: **electric green · gold/amber · deep teal · concrete grey · accent orange**.

---

## The Craft Standard (what "that level" means)

Every character in this library must pass all five tests before it ships. This is the bar that separates a mascot from a character:

1. **Silhouette test.** The character is recognizable as a solid black shape at 32px. One dominant form + one asymmetric break (a tuft, a tool, a crack, a lean).
2. **Countable features.** Exactly 2–3 signature facial/body features, named identically in every prompt. Models drift; countable features anchor identity.
3. **One material story.** Each character is built from materials of its home environment — the world grew them. No arbitrary textures.
4. **Personality drives motion.** Before any pose or shot, the personality paragraph decides how the character moves, waits, and looks at things. Appeal comes from behavior, not detail.
5. **Continuity Block.** A fixed, verbatim phrase carried into every still and video prompt. Never paraphrase it, never re-describe the character in i2v prompts.

**Render DNA (all prompts):** stylized 3D feature animation, soft subsurface scattering, physically based materials, cinematic key light with soft bounce fill, gentle film grain, shallow depth of field. Squash-and-stretch is *subtle* — weight first, cartoon second. Banned words: photoreal, hyperreal, 8K, epic, stunning.

---

## Production Pipeline (order matters)

```
1. Character sheet (Seedream 4, one generation, multi-view)
2. Expression sheet (Seedream 4, same seed family)
3. Character placed in environment plates (Nano Banana edit: sheet + environment still)
4. Seedance 2.0 i2v from those keyframes (first-frame mode)
5. Continuity pass — verify the Continuity Block wording is identical in every prompt
```

| Task | Model |
|---|---|
| Character sheets & turnarounds | Seedream 4 (same family as Seedance — matching render DNA) |
| Same character, new pose/scene | Nano Banana (identity-preserving edit) |
| Look exploration / moodboard | Midjourney v7 |
| Prop & material close-ups | FLUX Kontext |
| All motion | Seedance 2.0 (i2v from locked stills; text-to-video only for one-off hero shots) |

Never text-to-video a multi-shot sequence directly — character drift will kill it. Stills first, i2v second. One wardrobe/body state per character for the whole campaign.

---

## 01 · TUTU — The Wayfinder

**Role:** Brand hero. The small brave one the whole world is seen through.

**Personality:** Boundless, methodical curiosity. Tutu is never scared first — it leans *toward* the strange thing, ears-tuft forward, then remembers to be careful two seconds too late. Patient with big slow creatures, impatient with locked doors. Its confidence is earned, not loud: before a jump it always taps the ground twice with one front paw. That tap is the character.

**Design breakdown:**
- *Silhouette:* one bean-shaped body, oversized head, short sturdy legs; asymmetric break = a single tall antenna-tuft that reacts half a second behind the body.
- *Materials (home: The Golden Hex, 10):* back covered in small warm-amber hexagonal plates like honeycomb enamel, soft matte moss-green underbelly fur, paw pads of smooth river-stone grey.
- *Countable features:* (1) large round eyes of luminous green with gold ring irises, (2) the single antenna-tuft with a tiny amber bulb tip, (3) three hex plates on the forehead forming a triangle.
- *Scale:* knee-height to a human. Everything in the world is bigger than Tutu; the camera loves this.

**Animation notes:** Weight of a dense housecat — lands heavy for its size, absorbs in the knees. Eyes lead every motion by 4–6 frames, then head, then body, tuft last. Idle: slow breathing, tuft drifting, occasional double ear-tap of the ground. Never squashes more than 10%.

**Continuity Block (verbatim in every prompt):**
`small bean-shaped creature with warm amber hexagonal plates on its back, moss-green underbelly, large luminous green eyes with gold ring irises, a single tall antenna-tuft with a small amber bulb tip, three small hex plates forming a triangle on its forehead`

**Character Sheet Prompt (Seedream 4):**
```
Character sheet, three views (front, 3/4, side) on a neutral warm-grey background: small bean-shaped creature with warm amber hexagonal plates on its back, moss-green underbelly, large luminous green eyes with gold ring irises, a single tall antenna-tuft with a small amber bulb tip, three small hex plates forming a triangle on its forehead. Stylized 3D feature animation, soft subsurface scattering, physically based materials, soft key light with bounce fill, gentle film grain. Friendly, curious expression, weight planted on short sturdy legs.
```

**Seedance 2.0 Prompt (hero shot · The Golden Hex):**
```
A small bean-shaped creature with warm amber hexagonal plates on its back, moss-green underbelly, large luminous green eyes with gold ring irises, a single tall antenna-tuft with a small amber bulb tip, three small hex plates forming a triangle on its forehead, walks across a vast glowing honeycomb plain, steam rising between amber tiles. It stops at a tile edge, taps the ground twice with one front paw, ears-tuft leaning forward, then hops the gap — heavy little landing, knees absorbing, tuft settling half a second late. Camera low tracking shot at creature eye level. Stylized 3D feature animation, soft subsurface scattering, warm amber and grey palette, gentle film grain, shallow depth of field.
```
- `--aspect_ratio 16:9` · `--duration 10`

---

## 02 · MARROW — The Fracture Giant

**Role:** Ancient guardian. The gentle mountain that moves once a century.

**Personality:** Immense patience and terrible shyness. Marrow has watched the plates shift for eras and speaks in single words with minutes between them. It is desperately careful — every motion is planned so as not to crush anything small, which is everything. When Tutu talks to it, Marrow lowers itself joint by joint like a collapsing cathedral, just to listen at eye level. The comedy and the heartbreak are the same thing: something that big trying to be delicate.

**Design breakdown:**
- *Silhouette:* massive triangular torso, no neck, head sunk between boulder shoulders; asymmetric break = one shoulder taller, hosting a small dead tree.
- *Materials (home: Fracture Ground, 08):* body of dark hexagonal basalt columns, molten orange light glowing in the seams between plates — brighter when it feels something. Cooled grey ash dusts the shoulders.
- *Countable features:* (1) two small deep-set ember-orange eyes, (2) a single diagonal crack across the chest that glows when it speaks, (3) the small dead tree on the left shoulder.
- *Scale:* four stories tall.

**Animation notes:** Every motion telegraphs — weight shifts one full second before a step; the ground answers with dust and pebble-fall (secondary motion is mandatory in every shot). Emotions read through seam-glow intensity, not the face. It never moves fast; urgency is shown by *more joints moving at once*, never by speed.

**Continuity Block (verbatim):**
`colossal gentle giant built of dark hexagonal basalt columns with molten orange light glowing in the seams, ash-grey dusted shoulders, two small deep-set ember-orange eyes, one glowing diagonal crack across the chest, a small dead tree on its left shoulder`

**Character Sheet Prompt (Seedream 4):**
```
Character sheet, three views (front, 3/4, side) on a neutral warm-grey background: colossal gentle giant built of dark hexagonal basalt columns with molten orange light glowing in the seams, ash-grey dusted shoulders, two small deep-set ember-orange eyes, one glowing diagonal crack across the chest, a small dead tree on its left shoulder. Stylized 3D feature animation, physically based rock and ember materials, soft rim light, gentle film grain. Posture heavy and cautious, shoulders rounded inward, shy.
```

**Seedance 2.0 Prompt (hero shot · Fracture Ground):**
```
A colossal gentle giant built of dark hexagonal basalt columns with molten orange light glowing in the seams, ash-grey dusted shoulders, two small deep-set ember-orange eyes, one glowing diagonal crack across the chest, a small dead tree on its left shoulder, kneels down joint by joint on a cracked hexagonal plain under a towering teal storm sky. Dust and pebbles fall from its shoulders with each shift of weight. It lowers one huge open palm to the ground, seams brightening softly. Camera starts at ground level and tilts up the full height of the body. Stylized 3D feature animation, teal and molten-orange palette, heat shimmer in foreground, gentle film grain.
```
- `--aspect_ratio 16:9` · `--duration 12`

---

## 03 · SIB — The Sanctum Wisp

**Role:** The guide who can't touch anything. Comic relief with a lonely core.

**Personality:** Sib is made of mist and desperately wants to hold things. It hovers around objects miming the act of picking them up, passes through them, sighs, and pretends that was the plan. Endlessly helpful, slightly vain about its glow, terrified of wind. It communicates in chimes from its lantern core and exaggerated full-body pantomime — Sib is the character animators fight over.

**Design breakdown:**
- *Silhouette:* teardrop of drifting vapor around a hard geometric core; asymmetric break = two little vapor arms it shapes at will (they dissolve when it's sad).
- *Materials (home: The Sunken Sanctum, 02):* body of layered green bioluminescent mist, semi-transparent at the edges; core is a small ancient stone lantern with yellow-green light inside, carved with worn glyphs.
- *Countable features:* (1) two simple oval eyes of brighter light floating in the mist, (2) the carved stone lantern core at its center, (3) a small chipped corner on the lantern.
- *Scale:* the size of a lantern — smaller than Tutu.

**Animation notes:** Never stops moving; hovers with a slow 3-second bob. Emotional state = mist density (confident: crisp edges; embarrassed: almost dissolves, lantern glow visible through the body). When it "runs", the mist streams behind the core like a comet. Vapor is a secondary-motion character of its own — give it a line in every shot.

**Continuity Block (verbatim):**
`small teardrop-shaped spirit of layered green bioluminescent mist with two simple oval eyes of bright light, a carved ancient stone lantern glowing yellow-green at its core, one chipped corner on the lantern`

**Character Sheet Prompt (Seedream 4):**
```
Character sheet, three views (front, 3/4, side) on a dark neutral background: small teardrop-shaped spirit of layered green bioluminescent mist with two simple oval eyes of bright light, a carved ancient stone lantern glowing yellow-green at its core, one chipped corner on the lantern. Two soft vapor arms shaped mid-gesture. Stylized 3D feature animation, volumetric mist with semi-transparent edges, soft glow, gentle film grain. Eager, helpful expression.
```

**Seedance 2.0 Prompt (hero shot · The Sunken Sanctum):**
```
A small teardrop-shaped spirit of layered green bioluminescent mist with two simple oval eyes of bright light, a carved ancient stone lantern glowing yellow-green at its core, one chipped corner on the lantern, hovers between ruined stone pillars in a sunken chamber, bobbing slowly. It shapes two vapor arms, mimes lifting a fallen pebble, passes straight through it, glances at camera, and pretends to dust itself off. Mist trails and curls behind its core with every turn. Camera slow dolly forward at hover height. Stylized 3D feature animation, yellow-green bioluminescent palette, volumetric light shafts, gentle film grain.
```
- `--aspect_ratio 16:9` · `--duration 10`

---

## 04 · ORUN — The Compound Keeper

**Role:** Custodian droid of The Compound. Deadpan order in a chaotic world.

**Personality:** Orun has maintained an empty bunker for nine hundred years and considers this a satisfying career. It is precise, literal, and secretly sentimental — it keeps a shelf of "unauthorized objects" (a feather, a hex tile, a dead flower) it cannot bring itself to incinerate. Dry comic timing: Orun does everything at exactly one speed, which makes panic look identical to filing. Its loyalty, once given, is absolute.

**Design breakdown:**
- *Silhouette:* heavy cylindrical body like a riveted pillar, short strong arms, tri-wheel base; asymmetric break = one long antenna bent at a right angle, repaired with wire.
- *Materials (home: The Compound, 06):* cast concrete panels over a brass frame, rivet seams, rubber wheel treads worn smooth; the brand's split green/orange emblem stamped on the chest, paint half-flaked.
- *Countable features:* (1) a single wide horizontal visor eye glowing warm green, (2) the flaking green/orange emblem on the chest, (3) the bent wire-repaired antenna.
- *Scale:* human chest height, twice human width.

**Animation notes:** Moves in straight lines and 90° turns only — arcs are for emergencies and read as deep emotion. Servo micro-pauses before each gesture (think, then move). The visor eye is the entire face: width, brightness and tilt of the green glow carry every expression. Weight is real: floors resonate, wheels need a half-turn of torque before rolling.

**Continuity Block (verbatim):**
`heavy cylindrical custodian robot of cast concrete panels over a brass frame with rivet seams, a single wide horizontal visor eye glowing warm green, a half-flaked green and orange split emblem on its chest, one bent antenna repaired with wire, rolling on a tri-wheel base`

**Character Sheet Prompt (Seedream 4):**
```
Character sheet, three views (front, 3/4, side) on a neutral warm-grey background: heavy cylindrical custodian robot of cast concrete panels over a brass frame with rivet seams, a single wide horizontal visor eye glowing warm green, a half-flaked green and orange split emblem on its chest, one bent antenna repaired with wire, rolling on a tri-wheel base. Short strong arms with three-finger grippers. Stylized 3D feature animation, physically based concrete brass and rubber materials, soft industrial key light, gentle film grain. Upright, dutiful posture.
```

**Seedance 2.0 Prompt (hero shot · The Compound):**
```
A heavy cylindrical custodian robot of cast concrete panels over a brass frame with rivet seams, a single wide horizontal visor eye glowing warm green, a half-flaked green and orange split emblem on its chest, one bent antenna repaired with wire, rolling on a tri-wheel base, patrols the curved concrete wall of a massive circular bunker at night, green nebula sky overhead. It stops, servo-pauses, carefully straightens a small feather on a shelf of odd keepsakes, visor glow softening, then resumes patrol in a perfect straight line. Camera slow arc following at waist height, floor dust stirring in the wheel treads. Stylized 3D feature animation, concrete grey with green and orange accents, night exterior light, gentle film grain.
```
- `--aspect_ratio 16:9` · `--duration 12`

---

## 05 · AURRA — The Sky Ribbon

**Role:** The untouchable wonder. Migration, scale, awe.

**Personality:** Aurra is barely a "someone" — an animal of light with the temperament of a whale: slow, unbothered, faintly curious about small warm things on the ground. It answers no one, but it remembers kindness; a place where it was sung to, it returns to every cycle. Its presence reorganizes every scene: characters stop, look up, and are quiet.

**Design breakdown:**
- *Silhouette:* an enormous manta-like ribbon, wings that trail into aurora streamers; asymmetric break = one wingtip torn into three streamers instead of one.
- *Materials (home: Aurora Plateau, 15):* body of layered electric-green aurora light, denser and almost solid along the spine, dissolving to pure sky at the trailing edges; faint blue nebula freckles across the back.
- *Countable features:* (1) two pale gold eyes set wide on the mantle, (2) the triple-streamer torn left wingtip, (3) a row of blue freckle-lights along the spine.
- *Scale:* wingspan of a valley.

**Animation notes:** Never flaps — it *banks*, and the whole sky follows two seconds later. All motion is 6–10 second curves; light ripples travel down the body from head to streamer tips. On the ground below, its glow moves like weather: shadows and green light sweeping the terrain are its footstep. Silence is part of the character — no roars.

**Continuity Block (verbatim):**
`immense manta-like sky creature made of layered electric-green aurora light, dense along the spine and dissolving at the trailing edges, two pale gold eyes set wide on the mantle, a left wingtip torn into three streamers, a row of small blue freckle-lights along its spine`

**Character Sheet Prompt (Seedream 4):**
```
Character sheet, three views (top, 3/4, front) on a deep night-sky background: immense manta-like sky creature made of layered electric-green aurora light, dense along the spine and dissolving at the trailing edges, two pale gold eyes set wide on the mantle, a left wingtip torn into three streamers, a row of small blue freckle-lights along its spine. Stylized 3D feature animation, volumetric aurora light, soft star field, gentle film grain. Calm, gliding posture.
```

**Seedance 2.0 Prompt (hero shot · Aurora Plateau):**
```
Low ground-level shot across a rocky barren plain: an immense manta-like sky creature made of layered electric-green aurora light, dense along the spine and dissolving at the trailing edges, two pale gold eyes set wide on the mantle, a left wingtip torn into three streamers, a row of small blue freckle-lights along its spine, banks slowly overhead filling the entire sky. Green light sweeps across the boulders like moving weather as it passes, ripples of brightness traveling from its head down to the streamer tips. Camera tilts up and drifts right, following. Stylized 3D feature animation, electric green and blue palette, atmospheric haze, gentle film grain, held awe.
```
- `--aspect_ratio 16:9` · `--duration 12`

---

## 06 · PIP & POK — The Altar Twins

**Role:** Comic duo. Two halves of one argument.

**Personality:** Born from the twin altar smokes — Pip from the blue column, Pok from the pink. They share one job (keep the altar fires breathing) and disagree about everything else: technique, tempo, whose smoke is rounder. Pip is fussy and counts everything; Pok improvises and is always almost right. They finish each other's gestures, fight in complete silence, and instantly unite against any outside threat. Physical comedy engine of the brand.

**Design breakdown:**
- *Silhouette:* two small stout imps with kettle-round bellies and stubby chimney crowns; distinguishable at a glance — Pip is slightly taller and lean, Pok rounder and lower. Their smoke plumes are their hair and their mood.
- *Materials (home: The Altar Fires, 05):* bodies of warm soot-grey volcanic stone, smoothed by eras of handling; inner ember glow at the mouth and belly seams — Pip's glow cool blue, Pok's warm pink; chimney crowns leak a constant thin plume in their color.
- *Countable features:* Pip — (1) blue belly-seam glow, (2) three thin stacked stone rings on the left wrist, (3) a tall narrow blue plume. Pok — (1) pink belly-seam glow, (2) one wide stone ring worn as a belt, (3) a short fat pink plume.
- *Scale:* half of Tutu's height each.

**Animation notes:** Always staged as a pair — mirrored poses when agreeing, clashing diagonals when fighting. Plumes broadcast emotion before the body does (puff = surprise, thin hiss = sulking, braided plumes = harmony, the rare beat that ends every argument). Snappy timing, 2s-style holds, but weight stays stone-real: they land like dropped mugs, not balloons.

**Continuity Block (verbatim):**
`two small stout stone imps with kettle-round bellies and chimney crowns: the taller lean one with a cool blue belly-seam glow, three thin stone rings on its left wrist and a tall narrow blue smoke plume; the rounder low one with a warm pink belly-seam glow, one wide stone ring worn as a belt and a short fat pink smoke plume`

**Character Sheet Prompt (Seedream 4):**
```
Character sheet, side-by-side front and 3/4 views on a neutral warm-grey background: two small stout stone imps with kettle-round bellies and chimney crowns: the taller lean one with a cool blue belly-seam glow, three thin stone rings on its left wrist and a tall narrow blue smoke plume; the rounder low one with a warm pink belly-seam glow, one wide stone ring worn as a belt and a short fat pink smoke plume. Soot-grey volcanic stone bodies smoothed by wear, ember glow at mouths. Stylized 3D feature animation, physically based stone and smoke, soft overcast light, gentle film grain. Mid-argument poses, clashing diagonals.
```

**Seedance 2.0 Prompt (hero shot · The Altar Fires):**
```
At the base of two ancient mushroom-shaped stone altars on a barren plain, two small stout stone imps with kettle-round bellies and chimney crowns: the taller lean one with a cool blue belly-seam glow, three thin stone rings on its left wrist and a tall narrow blue smoke plume; the rounder low one with a warm pink belly-seam glow, one wide stone ring worn as a belt and a short fat pink smoke plume — argue in silent pantomime about how to stoke the fires, plumes puffing with each gesture. They freeze, glance up at the altars, then work in sudden perfect sync, their blue and pink plumes braiding together as the altar smoke columns rise. Camera static wide, then slow push in. Stylized 3D feature animation, soot grey with blue and pink glow, overcast green-grey sky, gentle film grain.
```
- `--aspect_ratio 16:9` · `--duration 12`

---

## Ensemble Shot (all-cast brand piece)

**Seedance 2.0 Prompt (The Cosmic Seam):**
```
Wide shot on a cracked salt flat at dusk, a green and gold nebula reflected in a mirror-thin water layer. A small bean-shaped creature with warm amber hexagonal plates on its back, moss-green underbelly, large luminous green eyes with gold ring irises, a single tall antenna-tuft with a small amber bulb tip, three small hex plates forming a triangle on its forehead, walks point, tapping the ground twice before each step. Behind it: a small teardrop-shaped spirit of layered green bioluminescent mist with a carved stone lantern core hovering at its shoulder, two small stout stone imps with blue and pink smoke plumes bickering silently at the rear, a heavy cylindrical concrete custodian robot with a wide green visor eye rolling a straight line through the group's zigzag, and far behind, a colossal gentle giant of dark basalt with molten orange seams stepping carefully around all of them. Overhead, an immense manta of electric-green aurora light banks slowly, its glow sweeping the wet ground. Camera slow pull-back revealing the caravan reflected in the water. Stylized 3D feature animation, green gold and blue palette, gentle film grain, quiet wonder.
```
- `--aspect_ratio 16:9` · `--duration 12`

---

## Summary Table

| # | Character | Archetype | Home Environment | Key Colors | Best Use |
|---|-----------|-----------|------------------|------------|----------|
| 01 | Tutu | Hero / wayfinder | The Golden Hex (10) | Amber, Moss Green | Brand hero, all touchpoints |
| 02 | Marrow | Gentle guardian | Fracture Ground (08) | Basalt, Molten Orange | Scale, trust, heart |
| 03 | Sib | Guide / comic heart | The Sunken Sanctum (02) | Bio Green, Stone | Onboarding, helper UI |
| 04 | Orun | Deadpan keeper | The Compound (06) | Concrete, Green/Orange | Brand identity, reliability |
| 05 | Aurra | Wonder / awe | Aurora Plateau (15) | Electric Green, Blue | Hero films, launch moments |
| 06 | Pip & Pok | Comic duo | The Altar Fires (05) | Stone, Blue, Pink | Social, shorts, reactions |

**Pairing logic:** Tutu carries every story; Sib explains; Pip & Pok get the laughs; Orun grounds the brand promise; Marrow delivers the emotional beat; Aurra closes the film.
