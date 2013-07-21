(function() {
var soundc
    , app;
window.App = soundc = {
	Models: {},
	Collections: {},
	Views: {}
};

SC.initialize({
		client_id: '45e1f7e473518eccbcb6bc27ecac7c44',
		redirect_uri: 'http://houndsound.site44.com/callback.html'
	});

$(document).ready(function() {
  $('a.connect').click(function(e) {
    e.preventDefault();
    SC.connect(function() {
      SC.get('/me', function(me) {
        $('#username').html(me.username);
      });
    });
  });
});

window.template = function(id) {
	return _.template( $('#' + id).html() );
};

App.Models.Track = Backbone.Model.extend({
	validate: function(attrs) {
		if ( ! $.trim(attrs.title) ) {
			return 'A Track requires a valid title.';
		}
	},
	initialize: function(){
		var self = this;
		}
});

App.Collections.Tracks = Backbone.Collection.extend({
	model: App.Models.Track
});

App.Views.Tracks = Backbone.View.extend({
	tagName: 'ul',
	className: 'space-list',
	initialize: function(){
		_.bindAll(this, "render");
		var self = this;
		SC.get('/tracks', { genres: 'chillwave', limit: 10 }, function(tracks, error) {
			if(error) console.log('ERROR: ', error);
			_.each(tracks, function(value, index){
                self.collection.add(new App.Models.Track(value));
            });
        	self.collection.on("sync", this.render, this);
        	self.render();
        }

	)},

	render: function() {
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(track) {
		var trackView = new App.Views.Track({ model: track });
		this.$el.append(trackView.render().el);
	}
});

App.Views.Track = Backbone.View.extend({
	className: 'space-list-item',
	template: template('playlist'),

	initialize: function() {


	},

	render: function() {

		var template = this.template( this.model.toJSON() );
		this.$el.html(template);
		return this;
	}
});

var trackCollection = new App.Collections.Tracks();
        soundc.app = app = new App.Views.Tracks({collection: trackCollection});
    $('.tracks').html(app.render().el);

})();
