;(function () {
  function getScreensBase() {
    var path = window.location.pathname || '';
    var marker = '/screens/';
    var idx = path.indexOf(marker);
    if (idx === -1) return '';
    return path.slice(0, idx + marker.length);
  }

  function navigate(relativePath) {
    window.location.href = getScreensBase() + relativePath;
  }

  window.goToLeadershipEntry = function () {
    navigate('user1-leadership/01-entry-orientation.html');
  };

  window.goToScenarioSelection = function () {
    navigate('user1-leadership/02-scenario-selection.html');
  };

  window.goToInteractionPreview = function () {
    navigate('user1-leadership/03-interaction-preview.html');
  };

  window.goToLiveAdversary = function () {
    navigate('user1-leadership/04-live-adversary.html');
  };

  window.goToCoachAnalysis = function () {
    navigate('user1-leadership/05-coach-analysis.html');
  };

  window.goToPracticeOverview = function () {
    navigate('user1-leadership/06-practice-overview.html');
  };

  window.selectScenarioAndStart = function (scenarioId) {
    if (scenarioId) {
      try {
        localStorage.setItem('selectedScenario', scenarioId);
      } catch (e) {
        // ignore storage errors
      }
    }
    window.goToInteractionPreview();
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initInteractionPreview() {
    var titleEl = document.getElementById('current-scenario-title');
    if (!titleEl) return;

    var scenarioTitles = {
      'project-budget-defense': 'Project Budget Defense',
      'underperforming-lead': 'Underperforming Lead',
      'qbr-resource-war': 'QBR Resource War'
    };

    var selected = null;
    try {
      selected = localStorage.getItem('selectedScenario');
    } catch (e) {
      selected = null;
    }

    if (selected && scenarioTitles[selected]) {
      titleEl.textContent = scenarioTitles[selected];
    }
  }

  function initLiveAdversary() {
    var input =
      document.getElementById('user-message-input') ||
      document.getElementById('messageInput');

    var sendBtn = document.getElementById('send-response-button');
    if (!sendBtn) {
      sendBtn = document.querySelector('button[onclick*="sendMessage"]');
    }

    var thread =
      document.getElementById('chat-thread') || document.querySelector('main');

    if (!input || !sendBtn || !thread) return;

    function appendMessage(text, from) {
      var wrapper = document.createElement('div');

      if (from === 'user') {
        wrapper.className = 'flex items-start gap-3 justify-end mt-4';
        wrapper.innerHTML =
          '<div class="flex flex-1 flex-col gap-2 items-end">' +
          '<p class="text-primary text-[11px] font-bold uppercase tracking-widest">Leadership Response</p>' +
          '<div class="glass-user rounded-2xl rounded-tr-none px-4 py-3 text-[14px] font-normal leading-relaxed text-slate-200 max-w-[90%] shadow-lg">' +
          escapeHtml(text) +
          '</div>' +
          '</div>';
      } else {
        wrapper.className = 'flex items-start gap-3 mt-4';
        wrapper.innerHTML =
          '<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-sm w-10 shrink-0 border border-white/20 filter grayscale" ' +
          'style=\'background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrZdyO2pJqHx2_FjwpPoNGwWsVD-3mLLzd_Lr4XsRcwoImyj8H_cL0IcVdYMa_7b72jyEhDx8bATF9U_xCL8qTptAmQPFdR_0emTC3anHGCakK6ut2yjG3HaeRZ8qpkN3-yBpPLyyfNhwvbkEf-adsgQWmY1-AG2oEXmkRlUwD843MobJ58SSRg6RbAPPjeYuCLKn_HzRf2YyR4fzSvAMog0u8MxPQntqBGayFubQeUBV6OCub5JquPOzGOIix81pITlcUadN8ElWY");\'></div>' +
          '<div class="flex flex-1 flex-col gap-2 items-start">' +
          '<div class="flex items-center gap-2">' +
          '<p class="text-white text-[11px] font-black uppercase tracking-widest">Adversary Agent</p>' +
          '<span class="size-1 rounded-full bg-red-500 animate-pulse"></span>' +
          '</div>' +
          '<div class="adversary-bubble relative rounded-none border-l-4 border-red-600 px-4 py-4 text-[14px] font-medium leading-relaxed tracking-tight shadow-2xl">' +
          '<div class="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/10 border border-black/10 rounded text-[9px] font-black uppercase text-red-700">' +
          '<span class="material-symbols-outlined text-[12px]">bolt</span> Type A: Resistance' +
          '</div>' +
          '<p class="text-slate-900">' +
          escapeHtml(text) +
          '</p>' +
          '</div>' +
          '</div>';
      }

      thread.appendChild(wrapper);
      thread.scrollTop = thread.scrollHeight;
    }

    function handleSend() {
      var value = input.value.trim();
      if (!value) return;

      appendMessage(value, 'user');
      input.value = '';

      setTimeout(function () {
        appendMessage(
          'This is a simulated adversary response. Use it to practice staying steady under pressure.',
          'adversary'
        );
      }, 800);
    }

    sendBtn.addEventListener('click', handleSend);

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    });

    // Support existing inline handler if present
    window.sendMessage = handleSend;
  }

  document.addEventListener('DOMContentLoaded', function () {
    initInteractionPreview();
    initLiveAdversary();
  });
})();

