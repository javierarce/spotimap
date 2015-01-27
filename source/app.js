LoadMore = Backbone.View.extend({

  className: "LoadMore",
  events: {
    "click .js-load-more": "_onClick"
  },

  template: _.template('<a href="#" class="js-load-more">Load more</div></a>'),

  initialize: function(options) {

  },

  _onClick: function(e) {

    e.preventDefault();
    e.stopPropagation();

    this.trigger("onClick", this);

  },

  render: function() {

    this.$el.append(this.template());

    return this;

  }

});

SongView = Backbone.View.extend({

  tagName: "li",
  className: "SongItem",

  events: {
    "click .js-play": "_onClickPlay"
  },

  template: _.template('<a href="#" class="js-play"><div class="title"><strong><%= song %></strong>, <%= author %></div><div class="error"></div><div class="info"></div></a>'),

  initialize: function(options) {

    this.model = options.model;
    this.model.on("change:selected", this._onChangeSelected, this);
    this.model.on("change:error", this._onChangeError, this);

  },

  _onChangeError: function() {

    if (this.model.get("error")) {
      this.$el.addClass("has-error");
    } else {
      this.$el.removeClass("has-error");
    }

  },

  _onChangeSelected: function() {

    if (this.model.get("selected")) {
      this.$el.addClass("is-selected");
    } else {
      this.$el.removeClass("is-selected");
    }

  },

  _onClickPlay: function(e) {

    e.preventDefault();
    e.stopPropagation();

    this.model.set("selected", true);
    this.trigger("onClick", this.model, this);

  },

  render: function() {

    this.$el.append(this.template(this.model.attributes));

    return this;

  }

});

Song = Backbone.Model.extend({
});

Songs = Backbone.Collection.extend({
  model: Song
});

Player = Backbone.View.extend({

  className: "Player",

  events: {
    "click .js-back": "_onClickBack",
    "click .js-about": "_onClickAbout",
    "click .js-close": "_onClickAboutClose"
  },

  template: _.template('<div class="PlayerHeader"><strong>Spotimap</strong> a map of songs about cities<a href="#back" class="back js-back">back</a><div class="spinner"></div></div><div class="SongPlayer"><iframe width="100%" height="80px" frameborder="0" allowtransparency="true"></iframe></div><div class="Pane"><ul class="SongList"></ul></div><div class="PlayerSearch"></div><div class="PlayerFooter"><div class="inner"><div class="info">Source: <a href="http://en.wikipedia.org/wiki/List_of_songs_about_cities">Wikipedia</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#about" class="js-about">About this project</a>&nbsp;&nbsp;|&nbsp;&nbsp;Created by <a href="http://twitter.com/javier">Javier Arce</a></div><div class="stats"><span></span> <a href="#close" class="close js-close">Close</a></div></div></div>'),

  initialize: function(options) {


    _.bindAll(this, "_invalidateSong");

    this.options = _.extend({ zoomed: false, loading: false }, options);

    this.offsets = {};
    this.currentCity = "";

    this.songs = new Songs();
    this.audio = new Audio();

    this.model = new Backbone.Model(this.options);

    this.model.on("change:loading", this._onChangeLoading, this);
    this.model.on("change:zoomed", this._onChangeZoomed, this);
    this.model.on("change:show_loader", this._onChangeShowLoader, this);
    this.model.on("change:show_about", this._onChangeShowAbout, this);
    this.model.on("change:stats", this._onChangeStats, this);

    this.songs.on("reset", this._renderSongList, this);

    var self = this;

    var query = "SELECT COUNT(songs.cartodb_id) FROM songs, cities WHERE songs.city = cities.city AND available IS NOT false GROUP by songs.cartodb_id ORDER by songs.song ASC";

    var onError = function(errors) {
      // self._stopLoading();
    };

    var onSuccessQuery = function(data) {

      if (data && data.rows) {
        self.model.set("stats", "Currently showing <strong>" + data.rows.length + "</strong> songs from <strong>212 cities</strong>.");
      }

    };

      new cartodb.SQL({ user: this.options.username })
      .execute(query)
      .done(onSuccessQuery)
      .error(onError);


  },

  _onClickAbout: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.model.set("show_about", true);
  },

  _onClickAboutClose: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.model.set("show_about", false);
  },

  _onClickBack: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.trigger("onClickBack", this);
  },

  _onChangeShowAbout: function() {

    if (this.model.get("show_about")) {
      this.$el.addClass("show-about");
    } else {
      this.$el.removeClass("show-about");
    }

  },

  _onChangeStats: function() {
    this.$el.find(".PlayerFooter .stats span").append(this.model.get("stats"));
  },

  _onChangeShowLoader: function() {

    if (this.model.get("show_loader")) {
      this.$el.addClass("show-loader");
    } else {
      this.$el.removeClass("show-loader");
    }

  },

  _onChangeZoomed: function() {

    if (this.model.get("zoomed")) {
      this.$el.addClass("is-zoomed");
    } else {
      this.$el.removeClass("is-zoomed");
    }

  },

  _onChangeLoading: function() {

    if (this.model.get("loading")) {
      this._loading();
    } else {
      this._stopLoading();
    }

  },

  zoomIn: function() {
    this.model.set("zoomed", true);
  },

  zoomOut : function() {
    this.model.set("zoomed", false);
    this.$el.find(".Pane").fadeOut(200);
    this.$el.find('.PlayerSearch input[type="text"]').val("");
  },

  loading: function() {
    this.model.set("loading", true);
  },

  stopLoading : function() {
    this.model.set("loading", false);
  },

  _loading: function() {
    this.$el.addClass("is-loading");
  },

  _stopLoading : function() {
    this.$el.removeClass("is-loading");
  },

  search: function(query, callback) {

    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'track'
      },
      success: callback
    });

  },

  loadSongs: function(reset, songs) {

    if (reset) {
      this.$el.find(".SongList").empty();
      this.songs.reset([]);
    }

    this.songs.reset(songs);
    this.stopLoading();

    if (songs.length > 0) {
      this.$el.find(".Pane").fadeIn(200);
    }

    this._refreshPane();

  },

  _loadPlayer: function(spotify_url) {

    var url = "https://embed.spotify.com/?uri=" + spotify_url + "&view=coverart";
    this.$el.find(".SongPlayer").fadeIn(200);
    this.$el.find(".SongPlayer iframe").attr("src", url);

  },

  _play: function(song) {

    var song_name = song.get("song") + ", " + song.get("author");

    var self = this;

    this.search(song_name, function(response) {

      var tracks = response.tracks.items;

      if (tracks.length) {
        self._loadPlayer(tracks[0].uri);
      } else {
        song.set("error", true);
        self._invalidateSong(song);
      }

    });

  },

  _invalidateSong: function(song) {

    if (this.model.get("api_key")) {

      var query = "UPDATE songs SET available = false WHERE cartodb_id = " + song.get("cartodb_id");

      new cartodb.SQL({ user: this.options.username, api_key: this.model.get("api_key") })
      .execute(query)
      .done(function() { 
        console.log(song.get("song") + " was invalidated.");
      })
      .error(function() { 
        console.log("Error making " + song.get("song") + "unavailable.");
      });

    }

  },

  _refreshPane: function() {

    var self = this;

    if (this.api) {
      setTimeout(function() {
        self.api.reinitialise();
      }, 300);
    }
  },

  goToCity: function(city) {

    if (!city) return;

    this.$el.find(".PlayerSearch input[type='text']").val(city);
    this.$el.find(".PlayerSearch input[type='submit']").click();

  },

  renderSearch: function() {

    if (this.vis) {
      var v = cdb.vis.Overlay.create('search', this.vis, {});
      v.show();
      this.$el.find(".PlayerSearch").append(v.render().el);
      v.$el.find('input[type="text"]').attr('placeholder', "Search for a city");
    }

  },

  _loadMoreSongs: function() {
    this._getSongsFor(this.currentCity);
  },

  _onCityClick: function(e, latlng, pos, data, layerNumber) {

    var self = this;

    this.map.panTo({ lat: data.latitude, lon: data.longitude });

    this.zoomIn();

    setTimeout(function() {
      self.map.setZoom(10);
    }, 500);

    this._getSongsFor(data.city);

  },

  _getSongsFor: function(city) {

    if (!city) return;

    var self = this;

    var reset = false;

    if (this.currentCity && city != this.currentCity) {
      reset = true;
      this.offsets[city] = 0;
    }

    if (!this.offsets[city]) this.offsets[city] = 0;

    this.currentCity = city;

    var query = "SELECT songs.cartodb_id, songs.song, songs.city, songs.author, cities.country, cities.the_geom_webmercator FROM songs, cities WHERE songs.city = cities.city AND cities.city = '" + city + "' AND available IS NOT false ORDER by songs.song ASC LIMIT 100 OFFSET " + this.offsets[city];

    var onError = function(errors) {
      // self._stopLoading();
    };

    var onSuccessQuery = function(data) {

      if (data && data.rows) {

        if (data.rows.length >= 100) {
          self.model.set("show_loader", true);
        } else {
          self.model.set("show_loader", false);
        }

        self.offsets[self.currentCity] += data.rows.length;
        self.loadSongs(reset, data.rows);
      }

    };

    setTimeout(function() {

      self.loading();

      new cartodb.SQL({ user: self.options.username })
      .execute(query)
      .done(onSuccessQuery)
      .error(onError);
    } , 600);

  },

  _onClickSong: function(song) {
    this._play(song);

    this.songs.each(function(s) { 

      if (s.get("cartodb_id") !== song.get("cartodb_id")) {
        s.set("selected", false); 
      }

    });

    this._refreshPane();

  },

  _renderSongList: function() {

    var self = this; 

    this.songs.each(function(song) {

      var item = new SongView({ model: song });

      item.bind("onClick", this._onClickSong, this);

      this.$el.find(".SongList").append(item.render().$el);

    }, this);


    this.api = this.$el.find(".Pane").jScrollPane({
      showArrows: true
    }).data("jsp");

  },

  render: function() {

    this.$el.append(this.template());
    this.renderSearch();

    var item = new LoadMore();

    item.bind("onClick", this._loadMoreSongs, this);
    this.$el.find(".Pane").append(item.render().$el);

    return this;

  }

});

App = Backbone.View.extend({

  defaults: {
    center: [40.0, 0.0],
    zoom: 2
  },

  el: "body",

  initialize: function(options) {

    _.bindAll(this, "_onCreatedVis");

    this.player = new Player({ username: "arce", api_key: this._getURLParam("api_key") });

    this.player.bind("onClickBack", this._onClickBack, this);
    this.player.bind("onClickAbout", this._onClickAbout, this);

    cartodb.createVis('map', "http://arce.cartodb.com/api/v2/viz/52aa5404-9d9a-11e4-99c0-0e4fddd5de28/viz.json", {
      center: this.defaults.center,
      zoom: this.defaults.zoom,
      search:false
    }).done(this._onCreatedVis);

    this.render();

  },

  _getURLParam: function(sParam) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }

  },

  _onClickBack: function() {

    var self = this;

    this.map.panTo({ lat: this.defaults.center[0], lon: this.defaults.center[1] });
    setTimeout(function() {
      self.map.setZoom(self.defaults.zoom);
      self.player.zoomOut();
    }, 500);

  },

  _onCreatedVis: function(vis, layers){

    var cartoDBLayer = layers[1];

    this.titlesLayer     = cartoDBLayer.getSubLayer(1);

    this._addCursorInteraction(vis, cartoDBLayer);

    this.titlesLayer.set({ 'interactivity': ['city', 'country', 'latitude', 'longitude', 'cartodb_id'] });

    var self = this;

    this.map = vis.getNativeMap();

    this.player.vis = vis;
    this.player.map = this.map;
    this.player.renderSearch();
    this.player.goToCity(this._getURLParam("city"));

    cartoDBLayer.on('featureClick',  this.player._onCityClick, this.player);

  },

  _addCursorInteraction: function(viz, layer) {

    var hovers = [];
    var mapView = viz.mapView;

    layer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
      hovers[layer] = 1;
      if(_.any(hovers))
        mapView.setCursor('pointer');
    }, mapView);

    layer.bind('featureOut', function(m, layer) {
      hovers[layer] = 0;
      if(!_.any(hovers))

        mapView.setCursor('auto');
    }, mapView);
  },

  render: function() {
    this.$el.append(this.player.render().$el);
  }

});

$(function(){
  window.app = new App();
});
