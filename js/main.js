// Simple helpers used across pages

document.addEventListener("DOMContentLoaded", () => {
  // set current year in footer(s)
  const y = new Date().getFullYear();
  document.querySelectorAll("#year, #year-2, #year-3").forEach(el=>{
    if(el) el.textContent = y;
  });

  // mobile menu toggles (works for multiple pages)
  document.querySelectorAll(".menu-toggle").forEach(btn=>{
    btn.addEventListener("click", () => {
      const navId = btn.getAttribute("aria-controls") || btn.nextElementSibling?.id;
      const nav = navId ? document.getElementById(navId) : btn.nextElementSibling;
      if(!nav) return;
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // simple form validation and fake send for contact form
  const form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name;
      const email = form.email;
      const message = form.message;
      let ok = true;
      [name, email, message].forEach(inp => {
        inp.classList.remove("invalid");
        if(!inp.checkValidity()){
          ok = false;
          inp.classList.add("invalid");
        }
      });
      const success = document.getElementById("form-success");
      if(!ok){
        if(success) success.textContent = "Please correct the highlighted fields.";
        return;
      }
      // Simulate sending (in production you'd POST to server or Netlify forms)
      if(success){
        success.textContent = "Thanks! Your message was sent (simulation).";
        form.reset();
      }
    });
  }

  // simple scroll animation: adds class when element enters viewport
  const animEls = document.querySelectorAll(".animate-on-scroll");
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  animEls.forEach(el => io.observe(el));
});
