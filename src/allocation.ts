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

type AllocationDisplayRow = {
  label: string;
  value: number;
  color: string;
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

function renderAllocationReadout(
  assignedCrewCount: number,
  result: AllocationResult,
) {
  const { production, consumption, balance } = result;
  readout.textContent =
    `Assigned: ${assignedCrewCount}/6 · Production: ${production} · Consumption: ${consumption} · Balance: ${
      balance > 0 ? "+" : ""
    }${balance}`;
}

function drawAllocationBars(result: AllocationResult) {
  const rows: AllocationDisplayRow[] = [
    {
      label: "Production",
      value: result.production,
      color: "#27766b",
    },
    {
      label: "Consumption",
      value: result.consumption,
      color: "#a44d23",
    },
  ];

  for (const [index, row] of rows.entries()) {
    const y = 110 + index * 52;

    ctx.fillStyle = "#233e43";
    ctx.font = "14px system-ui";
    ctx.fillText(`${row.label}: ${row.value}`, 18, y - 8);

    ctx.fillStyle = row.color;
    ctx.fillRect(18, y, row.value * 14, 20);
  }
}

function renderAllocation() {
  const result = calculateAllocation(assignedCrewCount);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrewAssignments(assignedCrewCount);

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${assignedCrewCount} / 6`, 18, 76);
  drawAllocationBars(result);
  renderAllocationReadout(assignedCrewCount, result);
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
