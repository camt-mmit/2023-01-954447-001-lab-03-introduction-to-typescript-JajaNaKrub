import { createComponent } from "./input-component.js";
export function createSection(sectionElement: HTMLElement) {
  const secInput = sectionElement.querySelector<HTMLTemplateElement>(
    "template.app-tmp-section"
  );
  if (secInput === null) {
    throw new Error("Cannot find input section");
  }
  const secList = secInput.parentElement;
  if (secList === null) {
    throw new Error("Cannot find list section");
  }

  const updateList = () => {
    const children = [...secList.children].filter((elem) => elem !== secInput);
    console.debug(children);
    children.forEach((element, i) => {
      [...element.querySelectorAll(".app-cmp-sec-no")].forEach(
        (elem) => (elem.textContent = `${i + 1}`)
      );
    });

    [
      ...secList.querySelectorAll<HTMLElement & { disabled: boolean }>(
        ".app-cmp-remove-sec"
      ),
    ].forEach((elem) => (elem.disabled = children.length === 1));
  };

  const createElement = () => {
    const container = (secInput.content.cloneNode(true) as DocumentFragment)
      .firstElementChild;
    if (container === null) {
      throw new Error("Cannot find template contrainer");
    }

    container.addEventListener("click", (ev) => {
      if ((ev.target as Element | null)?.matches?.(".app-cmp-remove-sec")) {
        container.remove();

        updateList();
      }
    });

    secList.append(container);
    createComponent(container);
    updateList();
  };

  sectionElement.addEventListener("click", (ev) => {
    if ((ev.target as Element | null)?.matches?.(".app-cmp-add-sec")) {
      createElement();
    }
  });
  createElement();
}
