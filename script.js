document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('generatorForm');
  const resultsSection = document.getElementById('resultsSection');
  const simulationOutput = document.getElementById('simulationOutput');
  const promptOutput = document.getElementById('promptOutput');
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const copyBtn = document.getElementById('copyBtn');

  // Markdown rendering configuration if standard marked is available
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get values
    const bsName = document.getElementById('businessName').value;
    const niche = document.getElementById('niche').value;
    const usp = document.getElementById('usp').value;
    const audience = document.getElementById('audience').value;
    
    // 1. Generate Master Prompt
    const masterPrompt = generateMasterPrompt(bsName, niche, usp, audience);
    
    // 2. Generate Simulated Output
    const simulatedOutput = generateSimulatedOutput(bsName, niche, usp, audience);
    
    // Render to DOM
    if (typeof marked !== 'undefined') {
      promptOutput.innerHTML = marked.parse(masterPrompt);
      simulationOutput.innerHTML = marked.parse(simulatedOutput);
    } else {
      // Fallback if marked didn't load
      promptOutput.innerText = masterPrompt;
      simulationOutput.innerText = simulatedOutput;
    }
    
    // Reveal results smoothly
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Tab switching logic
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      
      // Add active to clicked tab
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Copy functionality
  copyBtn.addEventListener('click', () => {
    const activeTabId = document.querySelector('.tab-btn.active').getAttribute('data-target');
    const activeContent = (activeTabId === 'simulation') ? 
        generateSimulatedOutput(
            document.getElementById('businessName').value,
            document.getElementById('niche').value,
            document.getElementById('usp').value,
            document.getElementById('audience').value
        ) : 
        generateMasterPrompt(
            document.getElementById('businessName').value,
            document.getElementById('niche').value,
            document.getElementById('usp').value,
            document.getElementById('audience').value
        );

    navigator.clipboard.writeText(activeContent).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    });
  });

  // Generators
  function generateMasterPrompt(business, niche, usp, audience) {
    return `You are an expert, high-converting copywriter for local businesses.
Your goal is to write website copy and a UGC ad content pack for "**${business}**", a **${niche}**.

**Context & Constraints:**
- **Unique Value Proposition:** ${usp}
- **Target Audience:** ${audience}
- **Tone:** Authentic UGC (User-Generated Content) tone. Absolutely NOT salesy, generic, or overly corporate. It must feel like a relatable, genuine recommendation.

Please structure your response STRICTLY in the following format using Markdown:

---

## 1. Website Homepage Copy

**Hero Headline:** (A catchy, benefit-driven H1, max 10 words)

**Subheadline / Tagline:** (A supporting sentence that establishes trust and local presence)

**Intro Paragraph:** (A warm, engaging paragraph explaining the value and making the customer the hero of the story.)

---

## 2. UGC Ad Content Pack

### A. Authentic Hooks (Select 3)
Provide 3 distinct visual/verbal hooks to capture attention in the first 3 seconds of a short-form video.
1. [Hook 1]
2. [Hook 2]
3. [Hook 3]

### B. Full Ad Script
Write a 30-45 second video script with physical visual cues.
- **[0:00-0:03 - Hook]:** ...
- **[0:03-0:15 - The Struggle/Relatable Moment]:** ...
- **[0:15-0:30 - The Solution (${business})]:** ...
- **[0:30-0:45 - The Transformation & CTA]:** ...

### C. Platform-Specific Captions
Provide optimized captions for:
- **Instagram:** (Highly aesthetic, lifestyle-focused, use relevant hashtags)
- **TikTok:** (Short, punchy, trend-aware)
- **Facebook:** (Slightly longer, community/detailed approach)

### D. Clear Conversion Intent / CTA
Provide the final Call-To-Action to use across platforms (e.g., "Book your session at the link in bio!" or "Visit us at [Location]").
`;
  }

  function generateSimulatedOutput(business, niche, usp, audience) {
    return `**Look Radiant. Feel Timeless. Drape Your Story.**

---

## ✨ SUBHEADLINE / TAGLINE
*The most trusted ${niche.toLowerCase()} — where every individual shines with confidence and authenticity.*

---

## 💬 INTRO PARAGRAPH
At **${business}**, we believe you deserve to feel breathtakingly beautiful. Specializing in what matters to you, we've designed an experience built around exactly what you need. ${usp} Join thousands of happy clients who have redefined their daily story with us.

---

## 📱 UGC AD CONTENT PACK

### 🎯 Authentic Hooks
1. "I finally stopped searching for the perfect ${niche.toLowerCase()} after I found this hidden gem..."
2. "If you are struggling with finding good service, you need to see what **${business}** is doing."
3. "Come with me to get the ultimate transformation at the best spot in town!"

### 🎬 Full Ad Script (30 Seconds)
**[0:00-0:03 - Visual: Creator walking into ${business} looking excited]**
*Audio:* "I used to hate the whole process of finding a good professional..."

**[0:03-0:15 - Visual: Sitting down, showing the 'before']**
*Audio:* "It always felt intimidating, or they just never understood what I actually wanted."

**[0:15-0:30 - Visual: B-roll of the services happening at ${business}, smiles, aesthetic lighting]**
*Audio:* "But then I discovered **${business}**. The vibe is completely different. They actually listen, and their approach? Game-changing. ${usp}"

**[0:30-0:40 - Visual: Final reveal/after shot. Flawless outcome.]**
*Audio:* "I've never felt this confident. Seriously, if you need this in your life, you have to check them out."

### 📝 Captions
**Instagram:** 
Romanticize your routine ✨ Finding a ${niche.toLowerCase()} that truly understands your vision is hard, but **${business}** makes it effortless. Tap the link in our bio to book your next session! 🌿 #LocalBusiness #Transformation #Aesthetic

**TikTok:**
Not gatekeeping this spot anymore 🤫 The glow up is real at **${business}**. Run, don't walk! 🏃‍♀️💨 link in bio to book! #LocalGem #Vlog

**Facebook:**
Looking for a trustworthy ${niche.toLowerCase()}? We know how hard it can be to find the right fit. At **${business}**, we specialize in making sure you leave with exactly what you asked for. ${usp} Click the link below to see our availability this week!

---

## 🔗 CONVERSION INTENT / CTA
**Primary Call-To-Action:** "Ready for your transformation? Secure your spot at **${business}** today—link in bio!"`;
  }
});
