(function () {
  const grid = document.getElementById("teamGrid");
  if (!grid) {
    return;
  }

  const fallback = document.getElementById("teamFallback");

  const createText = (tag, text, className) => {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    el.textContent = text;
    return el;
  };

  const buildCard = (member) => {
    const column = document.createElement("div");
    column.className = "col-xl-3 col-lg-4 col-md-6 mb-4 d-flex";

    const card = document.createElement("div");
    card.className = "card border-0 w-100";

    const wrapper = document.createElement("div");
    wrapper.className = "card-img-wrapper";

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.loading = "lazy";
    image.src = member.img || "img/old.png";
    image.alt = member.name ? `${member.name}'s portrait` : "Team member";

    const body = document.createElement("div");
    body.className = "card-body text-center";

    if (member.name) {
      body.appendChild(createText("h5", member.name, "card-title mb-2"));
    }

    if (member.position) {
      body.appendChild(createText("p", member.position, "card-subtitle text-muted mb-2"));
    }

    const textWrapper = document.createElement("div");
    textWrapper.className = "card-text-wrapper";

    if (member.email) {
      const emailLink = document.createElement("a");
      emailLink.href = `mailto:${member.email}`;
      emailLink.className = "d-block mb-2";
      emailLink.textContent = member.email;
      textWrapper.appendChild(emailLink);
    }

    if (member.ln) {
      const linkedinLink = document.createElement("a");
      linkedinLink.href = member.ln;
      linkedinLink.target = "_blank";
      linkedinLink.rel = "noopener noreferrer";
      linkedinLink.className = "btn btn-sm btn-primary px-3";
      linkedinLink.innerHTML = '<i class="fa fa-linkedin"></i> LinkedIn';
      textWrapper.appendChild(linkedinLink);
    }

    if (textWrapper.childElementCount > 0) {
      body.appendChild(textWrapper);
    }

    wrapper.appendChild(image);
    wrapper.appendChild(body);
    card.appendChild(wrapper);
    column.appendChild(card);
    return column;
  };

  const resolveData = async () => {
    const sources = [
      grid.getAttribute("data-team-src"),
      // `contact.html` lives at project root of this site folder, the JSON moved into `js/` next to this script
      "js/all_member.json",
      "json/all_member.json",
      "../json/all_member.json",
    ].filter(Boolean);

    for (const url of sources) {
      try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (error) {
        console.warn(`Contact team data attempt failed for ${url}`, error);
      }
    }

    throw new Error("Unable to load team data from configured sources");
  };

  (async () => {
    try {
      const members = await resolveData();
      const fragment = document.createDocumentFragment();
      members.forEach((member) => {
        fragment.appendChild(buildCard(member));
      });
      grid.appendChild(fragment);
      if (fallback) {
        fallback.hidden = true;
      }
    } catch (error) {
      console.error(error);
      if (fallback) {
        fallback.hidden = false;
      }
    }
  })();
})();
