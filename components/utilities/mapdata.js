var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    IT21: {
      color: "#003599",
      name: "Piemonte"
    },
    IT23: {
      color: "#003599",
      name: "Valle d'Aosta"
    },
    IT25: {
      color: "#003599",
      name: "Lombardia"
    },
    IT32: {
      color: "#003599",
      name: "Trentino-Alto Adige"
    },
    IT34: {
      color: "#003599",
      name: "Veneto"
    },
    IT36: {
      color: "#003599",
      name: "Friuli Venezia Giulia"
    },
    IT42: {
      color: "#003599",
      name: "Liguria"
    },
    IT45: {
      color: "#003599",
      name: "Emilia-Romagna"
    },
    IT52: {
      color: "#003599",
      name: "Toscania"
    },
    IT55: {
      color: "#003599",
      name: "Umbria"
    },
    IT57: {
      color: "#003599",
      name: "Marche"
    },
    IT62: {
      color: "#003599",
      name: "Lazio"
    },
    IT65: {
      color: "#003599",
      name: "Abruzzo"
    },
    IT67: {
      color: "#003599",
      name: "Molise"
    },
    IT72: {
      color: "#003599",
      name: "Campania"
    },
    IT75: {
      color: "#003599",
      name: "Puglia"
    },
    IT77: {
      color: "#003599",
      name: "Basilicata"
    },
    IT78: {
      color: "#003599",
      name: "Calabria"
    },
    IT82: {
      color: "#003599",
      name: "Sicilia"
    },
    IT88: {
      color: "#003599",
      name: "Sardegna",
      description: " "
    }
  },
  locations: {},
  labels: {
    IT21: {
      name: "Piedmont",
      parent_id: "IT21"
    },
    IT23: {
      name: "Valle d'Aosta",
      parent_id: "IT23"
    },
    IT25: {
      name: "Lombardy",
      parent_id: "IT25"
    },
    IT32: {
      name: "Trentino-Alto Adige",
      parent_id: "IT32"
    },
    IT34: {
      name: "Veneto",
      parent_id: "IT34"
    },
    IT36: {
      name: "Friuli Venezia Giulia",
      parent_id: "IT36"
    },
    IT42: {
      name: "Liguria",
      parent_id: "IT42"
    },
    IT45: {
      name: "Emilia-Romagna",
      parent_id: "IT45"
    },
    IT52: {
      name: "Tuscany",
      parent_id: "IT52"
    },
    IT55: {
      name: "Umbria",
      parent_id: "IT55"
    },
    IT57: {
      name: "Marche",
      parent_id: "IT57"
    },
    IT62: {
      name: "Lazio",
      parent_id: "IT62"
    },
    IT65: {
      name: "Abruzzo",
      parent_id: "IT65"
    },
    IT67: {
      name: "Molise",
      parent_id: "IT67"
    },
    IT72: {
      name: "Campania",
      parent_id: "IT72"
    },
    IT75: {
      name: "Puglia",
      parent_id: "IT75"
    },
    IT77: {
      name: "Basilicata",
      parent_id: "IT77"
    },
    IT78: {
      name: "Calabria",
      parent_id: "IT78"
    },
    IT82: {
      name: "Sicilia",
      parent_id: "IT82"
    },
    IT88: {
      name: "Sardegna",
      parent_id: "IT88"
    }
  },
  legend: {
    entries: []
  },
  regions: {},
  data: {
    data: {
      IT21: "0",
      IT23: "0",
      IT25: "0",
      IT32: "0",
      IT34: "0",
      IT36: "0",
      IT42: "0",
      IT45: "0",
      IT52: "0",
      IT55: "1",
      IT57: "1",
      IT62: "0",
      IT65: "0",
      IT67: "0",
      IT72: "0",
      IT75: "0",
      IT77: "0",
      IT78: "0",
      IT82: "0",
      IT88: "0"
    }
  }
};