document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar')

  const rawEvents = [
    {
      id: '1',
      resourceId: '1',
      start: '2025-09-01',
      end: '2025-09-30',
      title: '100 ANOS DE DALVA DE OLIVEIRA',
      color: '#9C8BC9'
    },
    {
      id: '2',
      resourceId: '2',
      start: '2025-09-10',
      end: '2025-09-25',
      title: '1° SEMINÁRIO DE SAÚDE E EDUCAÇÃO',
      color: '#757575'
    },
    {
      id: '3',
      resourceId: '3',
      start: '2025-09-17',
      end: '2025-09-27',
      title: '22 MOSTRA ALAGOANA DE DANÇA',
      color: '#BF3030'
    },
    {
      id: '4',
      resourceId: '4',
      start: '2025-09-18',
      end: '2025-09-29',
      title: 'EVENTOS RJ LTDA TESTE',
      color: '#6AB8ED'
    },
    {
      id: '5',
      resourceId: '5',
      start: '2025-09-10',
      end: '2025-09-30',
      title: 'GRAVAÇÃO INOVATECH',
      color: '#497CA7'
    },
    {
      id: '6',
      resourceId: '6',
      start: '2025-09-01',
      end: '2025-09-16',
      title: 'GRAVAÇÃO INOVATECH',
      color: '#E6BD3E'
    },
    {
      id: '7',
      resourceId: '1',
      start: '2025-09-15',
      end: '2025-09-16',
      title: 'GRAVAÇÃO INOVATECH',
      color: '#E6BD3E'
    }
  ]

  function eventosConflitam(ev1, ev2) {
    return ev1.resourceId === ev2.resourceId && new Date(ev1.start) < new Date(ev2.end) && new Date(ev2.start) < new Date(ev1.end)
  }

  const eventosComConflito = new Set()
  for (let i = 0; i < rawEvents.length; i++) {
    for (let j = i + 1; j < rawEvents.length; j++) {
      if (eventosConflitam(rawEvents[i], rawEvents[j])) {
        eventosComConflito.add(rawEvents[i].id)
        eventosComConflito.add(rawEvents[j].id)
      }
    }
  }

  const eventosDecorados = rawEvents.map((evento) => {
    if (eventosComConflito.has(evento.id)) {
      return {
        ...evento,
        title: `⚠️ ${evento.title}`,
        message: 'Conflito',
        textColor: 'black'
      }
    }
    return evento
  })

  function atualizaMes() {
    const currentDate = calendar.getDate()
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const month = monthNames[currentDate.getMonth()]

    const button = document.querySelector('.fc-monthNav-button')
    if (button) {
      button.innerText = `< ${month} >`
    }
  }

  function atualizaAno() {
    const currentDate = calendar.getDate()
    const year = currentDate.getFullYear()

    const button = document.querySelector('.fc-customYear-button')
    if (button) {
      button.innerText = `< ${year} >`
    }
  }

  const urlCadastrarEvento = "{% url 'eventos:add_evento' %}"

  const calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: '',
      center: 'addEventButton monthNav customYear',
      right: ''
    },
    customButtons: {
      addEventButton: {
        text: 'Adicionar Evento',
        click: function () {
          window.location.href = urlCadastrarEvento
        }
      },
      monthNav: {
        text: '',
        click: function (e) {
          const button = e.target
          const rect = button.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const middle = rect.width / 2

          if (clickX < middle) {
            calendar.prev()
          } else {
            calendar.next()
          }
          atualizaMes()
        }
      },
      customYear: {
        text: '',
        click: function (e) {
          const button = e.target
          const rect = button.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const middle = rect.width / 2

          const currentDate = calendar.getDate()
          let newYear = currentDate.getFullYear()

          if (clickX < middle) {
            newYear -= 1
          } else {
            newYear += 1
          }

          const newDate = new Date(newYear, currentDate.getMonth(), 1)
          calendar.gotoDate(newDate)
          atualizaAno()
        }
      }
    },

    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: 'resourceTimelineMonth',
    initialDate: '2025-09-17',
    selectable: true,
    editable: true,
    height: 'auto',
    firstDay: 1,
    resourceAreaHeaderContent: 'Espaços',
    resourceAreaWidth: '16%',
    locale: 'pt-br',
    eventDidMount: function (info) {
      tippy(info.el, {
        content: info.event.title,
        theme: 'light-border',
        placement: 'top'
      })
    },
    slotLabelFormat: [{ weekday: 'short' }, { day: 'numeric' }],

    resources: [
      {
        id: 'categoria-a',
        title: 'Salas Frutas',
        children: [
          { id: '1', title: 'Sala Temática Mangaba' },
          { id: '2', title: 'Sala Temática Pitanga' },
          { id: '3', title: 'Sala Temática Siriguela' },
          { id: '4', title: 'Sala Temática Tamarindo' },
          { id: '5', title: 'Sala Temática Umbú' }
        ]
      },
      {
        id: 'categoria-b',
        title: 'Praias',
        children: [
          { id: '3', title: 'Espaço C' },
          { id: '4', title: 'Espaço D' }
        ]
      },
      {
        id: 'categoria-c',
        title: 'Auditório',
        children: [
          { id: '5', title: 'Espaço E' },
          { id: '6', title: 'Espaço F' },
          { id: '7', title: 'Espaço G' }
        ]
      },
      {
        id: 'categoria-d',
        title: 'Hall',
        children: [
          { id: '8', title: 'Espaço E' },
          { id: '9', title: 'Espaço F' },
          { id: '10', title: 'Espaço G' }
        ]
      },
      {
        id: 'categoria-e',
        title: 'Teatro',
        children: [
          { id: '11', title: 'Espaço E' },
          { id: '12', title: 'Espaço F' },
          { id: '13', title: 'Espaço G' }
        ]
      },
      {
        id: 'categoria-f',
        title: 'Lanchonete',
        children: [
          { id: '14', title: 'Espaço E' },
          { id: '15', title: 'Espaço F' },
          { id: '16', title: 'Espaço G' }
        ]
      }
    ],

    events: eventosDecorados,

    dayCellClassNames: function (arg) {
      const day = arg.date.getDay()
      if (day === 0 || day === 6) {
        return ['fc-weekend']
      }
      return []
    },

    eventDidMount: function (info) {
      tippy(info.el, {
        content: info.event.title,
        theme: 'light'
      })
    }
  })

  calendar.render()
  atualizaMes()
  atualizaAno()
})
