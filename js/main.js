// ── PROJECT DATA ──
const projects = {
  rccar: {
    emoji: '🚗',
    colorClass: 'c1',
    title: 'ESP32 BLE RC Car',
    sub: 'Personal Project · 2025',
    badges: [
      { label: 'PCB Design', cls: 'badge-orange' },
      { label: 'Embedded', cls: 'badge-pink' },
      { label: 'BLE', cls: 'badge-blue' },
    ],
    table: [
      ['MCU', 'ESP32 (BLE + Wi-Fi)'],
      ['Motor Driver', 'DRV8847 dual H-bridge (up to 2A/ch)'],
      ['Steering', 'Linear servo actuator'],
      ['Drive', 'Brushed DC motor'],
      ['Power', 'LiPo battery pack'],
      ['Wireless', 'BLE GATT server (custom service)'],
      ['Tool', 'Altium Designer'],
      ['Firmware', 'Custom C++ (ESP-IDF)'],
      ['Status', '🟡 In Progress'],
    ],
    sections: [
      {
        heading: 'Overview',
        text: 'Designed a fully custom RC car platform around the ESP32, replacing all off-the-shelf RC electronics with a purpose-built PCB. The car uses BLE to receive throttle and steering commands from a phone or custom controller. A DRV8847 dual H-bridge drives both the DC motor and linear servo from a single IC, and custom C++ firmware handles the full control loop.'
      },
      {
        heading: 'Hardware Design',
        bullets: [
          '<strong>ESP32 module</strong> — hosts a BLE GATT server with throttle and steering characteristics; handles all PWM generation',
          '<strong>DRV8847 motor driver</strong> — dual H-bridge controlling DC drive motor and linear servo; selected for low Rds(on), integrated overcurrent/thermal protection, and I²C-configurable current limits',
          '<strong>Linear servo steering</strong> — provides precise, low-backlash rack actuation; driven via DRV8847 ch2 with direction + PWM',
          '<strong>LiPo power system</strong> — onboard 3.3V regulation for ESP32 logic, pass-through for motor rails',
          '<strong>PCB layout</strong> — compact single-board in Altium with power plane separation, motor rail decoupling, and ESP32 antenna keepout'
        ]
      },
      {
        heading: 'Firmware Architecture',
        bullets: [
          '<strong>BLE GATT server</strong> — custom service with throttle and steering characteristics; on-write callback triggers control loop',
          '<strong>Control loop</strong> — decodes command packet, maps to PWM duty cycles, updates DRV8847 via I²C + PWM simultaneously',
          '<strong>Failsafe</strong> — on BLE disconnect, motor ramps to zero and steering centers within 200 ms to prevent runaway',
          '<strong>Current sensing</strong> — DRV8847 current output used for linear servo end-stop detection; prevents overtravel without limit switches'
        ]
      },
      { heading: 'Photos & Schematics', photo: '📷 PCB layout, 3D render, assembled board, BLE screenshot, oscilloscope PWM trace' }
    ]
  },
  torque: {
    emoji: '⚙️',
    colorClass: 'c2',
    title: 'Custom Steering Torque Sensor',
    sub: 'McMaster Baja Racing · 2025–Present',
    badges: [
      { label: 'Hardware', cls: 'badge-yellow' },
      { label: 'Analog', cls: 'badge-orange' },
      { label: 'PCB Design', cls: 'badge-green' },
    ],
    table: [
      ['Type', 'Full-bridge strain gauge (Wheatstone)'],
      ['Amplifier', 'MCP6002 instrumentation stage'],
      ['Sensitivity', '1 mV per ft·lb'],
      ['Tool', 'Altium Designer'],
      ['Firmware', 'C++ (in development)'],
      ['Status', '🟡 Firmware in progress'],
    ],
    sections: [
      {
        heading: 'Overview',
        text: 'Built a custom torque sensor for the Baja SAE steering column to measure driver steering input and feed live data to the vehicle\'s telemetry system. Designed to survive off-road vibration, temperature swings, dust, and grease that would destroy commercial sensors.'
      },
      {
        heading: 'What I Built',
        bullets: [
          'Bonded 2 strain gauges in a <strong>full Wheatstone bridge</strong> configuration on the intermediate steering shaft for common-mode noise rejection',
          'Designed a <strong>MCP6002-based instrumentation amplifier PCB</strong> in Altium to boost µV-level bridge output to a usable range',
          'Calibrated output to <strong>1 mV per ft·lb</strong> of torque across the operating range',
          'Developing C++ firmware to map voltage → torque and route data to the main car PCB'
        ]
      },
      {
        heading: 'Key Learnings',
        text: 'Strain gauge bonding requires extreme surface preparation — contamination causes non-linearity. The MCP6002 CMRR was critical for rejecting motor noise through the harness. Careful shielding was needed to maintain signal integrity at low torque values near the noise floor.'
      },
      { heading: 'Photos & Schematics', photo: '📷 Strain gauge on shaft, PCB layout, oscilloscope calibration trace, bench setup' }
    ]
  },
  pcb: {
    emoji: '🔌',
    colorClass: 'c3',
    title: 'Modular Motherboard Redesign',
    sub: 'McMaster Baja Racing · Aug–Nov 2025',
    badges: [
      { label: 'PCB Design', cls: 'badge-green' },
      { label: 'Hardware', cls: 'badge-yellow' },
    ],
    table: [
      ['MCU', 'Teensy'],
      ['Power Rails', '12V · 5V · 3.3V (regulated)'],
      ['Tool', 'Altium Designer'],
      ['Architecture', 'Core board + plug-in sensor modules'],
      ['Status', '✅ Deployed on vehicle'],
    ],
    sections: [
      {
        heading: 'Overview',
        text: 'The previous monolithic motherboard made competition debugging a nightmare — a single sensor failure required replacing the whole board mid-race. I redesigned it as a modular platform: a validated core board handles power and MCU routing, while sensor modules plug in independently and can be hot-swapped.'
      },
      {
        heading: 'Architecture',
        bullets: [
          '<strong>Core board isolation</strong> — power regulation, Teensy MCU, and bus routing are all confined to the core; no sensor logic lives here',
          '<strong>3 regulated power rails</strong> — 12V, 5V, and 3.3V with decoupling on each rail',
          '<strong>Standardized headers</strong> — Teensy data lines routed to uniform pin headers for any sensor module',
          '<strong>Hot-swap modules</strong> — any sensor can be physically removed, bench-tested, and reinserted in minutes'
        ]
      },
      {
        heading: 'Impact',
        text: 'Sensor module swaps now take minutes instead of hours. The architecture eliminated a critical single point of failure from competition day and significantly accelerated the team\'s sensor development cycle.'
      },
      { heading: 'Photos & Schematics', photo: '📷 Altium 3D render, board layout, assembled PCB, sensor module plug-in' }
    ]
  },
  scanner: {
    emoji: '📡',
    colorClass: 'c4',
    title: '3D Spatial Scanner',
    sub: 'Course / Personal Project · Mar–Nov 2025',
    badges: [
      { label: 'Embedded C', cls: 'badge-blue' },
      { label: 'MATLAB', cls: 'badge-purple' },
      { label: 'Hardware', cls: 'badge-yellow' },
    ],
    table: [
      ['MCU', 'MSP432 Series'],
      ['Sensor', 'VL53L1X Time-of-Flight (4m range)'],
      ['Interface', 'I²C (sensor) · UART (PC link)'],
      ['Languages', 'C (firmware) · MATLAB (visualization)'],
      ['Status', '✅ Complete — datasheet published'],
    ],
    sections: [
      {
        heading: 'Overview',
        text: 'Designed and built a full 3D spatial scanner from scratch. A VL53L1X ToF sensor mounted on a stepper motor captures depth readings at each rotation step. All motor control, sensor interfacing, and UART transmission written in C on the MSP432. MATLAB receives packets and renders a live 3D point cloud.'
      },
      {
        heading: 'What I Built',
        bullets: [
          'MSP432 firmware in <strong>C</strong> — stepper control, VL53L1X I²C interfacing, scan sequencing, UART packet transmission',
          '<strong>MATLAB visualization</strong> — polar → Cartesian transform, real-time 3D point cloud rendering',
          'Calibration + median filtering for <strong>sub-centimeter accuracy</strong> across the operating range',
          'Full <strong>technical datasheet</strong> — specs, electrical characteristics, performance metrics'
        ]
      },
      { heading: 'Photos & Results', photo: '📷 Hardware assembly, MATLAB 3D scan output, calibration accuracy graph' }
    ]
  },
  pedal: {
    emoji: '🎸',
    colorClass: 'c5',
    title: 'Boutique Guitar Pedal Design',
    sub: 'Personal Project · 2024–2025',
    badges: [
      { label: 'Analog', cls: 'badge-pink' },
      { label: 'PCB Design', cls: 'badge-orange' },
    ],
    table: [
      ['Tools', 'Altium Designer, Oscilloscope, Guitar'],
      ['Components', '100% SMD'],
      ['Pedals Built', '3 (2 reverse-engineered, 1 original)'],
      ['Deliverables', 'PCB layouts, schematics, BOMs'],
      ['Status', '✅ Complete — kits documented'],
    ],
    sections: [
      {
        heading: 'Overview',
        text: 'Reverse-engineered two commercial guitar pedals and designed one original — all as 100% SMD PCBs optimized for DIY kit assembly. Audio analog design uses the same signal conditioning principles as automotive sensor circuits: low-noise op-amp stages, gain-bandwidth tradeoffs, and oscilloscope validation.'
      },
      {
        heading: 'What I Built',
        bullets: [
          'Reverse-engineered circuit topologies from 2 commercial fuzz/overdrive pedals — analyzed gain stages, clipping networks, tone shaping',
          'Designed 1 original circuit targeting specific harmonic distortion characteristics',
          'Laid out <strong>3 SMD PCBs in Altium</strong>, optimized for hand-soldering kit assembly',
          'Validated gain and tonal character with <strong>oscilloscope + listening tests</strong>',
          'Produced <strong>schematics and BOMs</strong> for reproducible kit distribution'
        ]
      },
      {
        heading: 'Why It Matters',
        text: 'Audio signal chains and automotive sensor conditioning share the same core challenges: low-noise amplification, op-amp selection (GBWP, offset, CMRR), and measurement validation. This project directly informed analog design decisions on the Baja torque sensor.'
      },
      { heading: 'Photos & Schematics', photo: '📷 Altium PCB layouts, assembled pedals, oscilloscope waveforms, schematic pages' }
    ]
  }
};

// ── MODAL ──
function openProject(key) {
  const p = projects[key];
  if (!p) return;

  const badgesHtml = p.badges.map(b => `<span class="badge ${b.cls}">${b.label}</span>`).join('');
  const tableHtml = p.table.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  const sectionsHtml = p.sections.map(s => {
    let inner = '';
    if (s.text) inner += `<p class="modal-p">${s.text}</p>`;
    if (s.bullets) inner += `<ul class="modal-ul">${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    if (s.photo) inner += `<div class="modal-photo"><span style="font-size:22px">📷</span><span>${s.photo}</span><span style="font-size:10px;color:var(--muted)">Add your photos here</span></div>`;
    return `<div class="modal-h2">${s.heading}</div>${inner}`;
  }).join('');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-hero ${p.colorClass}">${p.emoji}</div>
    <h2 class="modal-title">${p.title}</h2>
    <div class="modal-sub">${p.sub}</div>
    <div class="modal-tags">${badgesHtml}</div>
    <table class="modal-table">${tableHtml}</table>
    ${sectionsHtml}
  `;

  document.getElementById('modal').classList.add('open');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE NAV ──
const toggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.section-header, .project-card, .timeline-item, .skill-group, .contact-inner > *');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when visible
      const bars = entry.target.querySelectorAll('.skill-bar');
      bars.forEach(bar => {
        setTimeout(() => bar.classList.add('animated'), 100);
      });
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ── CIRCUIT CANVAS ──
const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const nodes = [];
const lines = [];

function createCircuit() {
  nodes.length = 0;
  lines.length = 0;
  const cols = Math.floor(canvas.width / 80);
  const rows = Math.floor(canvas.height / 80);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (Math.random() > 0.55) {
        nodes.push({
          x: i * 80 + 40 + (Math.random() - 0.5) * 30,
          y: j * 80 + 40 + (Math.random() - 0.5) * 30,
          r: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && Math.random() > 0.6) {
        // L-shaped routing
        lines.push({ a: nodes[i], b: nodes[j], progress: 0, speed: Math.random() * 0.003 + 0.001 });
      }
    }
  }
}

createCircuit();

let animFrame;
function drawCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Lines
  lines.forEach(line => {
    line.progress = Math.min(1, line.progress + line.speed);
    const mx = line.a.x;
    const my = line.b.y;
    const alpha = Math.min(line.progress, 1) * 0.35;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(232,255,71,${alpha})`;
    ctx.lineWidth = 0.8;
    ctx.moveTo(line.a.x, line.a.y);
    ctx.lineTo(mx, line.a.y);
    ctx.lineTo(mx, my);
    ctx.lineTo(line.b.x, my);
    ctx.stroke();
  });

  // Nodes
  nodes.forEach(node => {
    node.pulse += node.speed;
    const alpha = (Math.sin(node.pulse) * 0.3 + 0.5) * 0.7;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,255,71,${alpha})`;
    ctx.fill();
  });

  animFrame = requestAnimationFrame(drawCircuit);
}

drawCircuit();
window.addEventListener('resize', () => { resizeCanvas(); createCircuit(); });
