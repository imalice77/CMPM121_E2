export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let assignedCrewCount = 2;

type AllocationResult = {
  production: number;
  consumption: number;
  balance: number;
};

function calculateAllocation(assignedCrewCount: number): AllocationResult {
  const production = assignedCrewCount * 3;
  const consumption = 6;
  const balance = production - consumption;

  return { production, consumption, balance };
}

function drawCrewAssignments(assignedCrewCount: number) {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < assignedCrewCount ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < assignedCrewCount ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
}

function renderAllocation() {
  const { production, consumption, balance } = calculateAllocation(
    assignedCrewCount,
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrewAssignments(assignedCrewCount);

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${assignedCrewCount} / 6`, 18, 76);
  ctx.fillText(`Production: ${production}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, production * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${consumption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, consumption * 14, 20);
  readout.textContent =
    `Assigned: ${assignedCrewCount}/6 · Production: ${production} · Consumption: ${consumption} · Balance: ${
      balance > 0 ? "+" : ""
    }${balance}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assignedCrewCount = Math.max(0, assignedCrewCount - 1);
  renderAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assignedCrewCount = Math.min(6, assignedCrewCount + 1);
  renderAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assignedCrewCount = 2;
    renderAllocation();
  };
renderAllocation();
