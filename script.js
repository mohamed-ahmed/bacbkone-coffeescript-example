// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  jQuery(function() {
    var Item, ItemView, List, ListView, list_view, _ref, _ref1, _ref2, _ref3;
    Item = (function(_super) {
      __extends(Item, _super);

      function Item() {
        _ref = Item.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Item.prototype.defaults = {
        part1: 'Hello',
        part2: 'Backbone'
      };

      return Item;

    })(Backbone.Model);
    List = (function(_super) {
      __extends(List, _super);

      function List() {
        _ref1 = List.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      List.prototype.model = Item;

      return List;

    })(Backbone.Collection);
    ItemView = (function(_super) {
      __extends(ItemView, _super);

      function ItemView() {
        this.unrender = __bind(this.unrender, this);
        this.render = __bind(this.render, this);
        _ref2 = ItemView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      ItemView.prototype.tagname = 'div';

      ItemView.prototype.id = 'boarder';

      ItemView.prototype.initialize = function() {
        _.bindAll(this);
        this.model.bind('change', this.render);
        return this.model.bind('remove', this.unrender);
      };

      /*render: -> 
      			$(@el).html """
      				<div id='list-item'>#{@model.get 'part1'} #{@model.get 'part2'}!
      				<span class="swap">swap</span>
      				<span class="delete">delete</span></div>
      			"""
      			# $(@el).slideUp("slow");
      			# $(@el).slideDown("slow");
      			console.log @
      			@
      */


      ItemView.prototype.render = function() {
        $(this.el).html("<div id='list-item'>\n	        <span>" + (this.model.get('part1')) + " " + (this.model.get('part2')) + "!</span>\n	        <span class=\"swap\">swap</span>\n	        <span class=\"delete\">delete</span>\n	        </div>");
        return this;
      };

      ItemView.prototype.unrender = function() {
        return $(this.el).remove();
      };

      ItemView.prototype.swap = function() {
        return this.model.set({
          part1: this.model.get('part2'),
          part2: this.model.get('part1')
        });
      };

      ItemView.prototype.remove = function() {
        return this.model.destroy();
      };

      ItemView.prototype.events = {
        'click .swap': 'swap',
        'click .delete': 'remove'
      };

      return ItemView;

    })(Backbone.View);
    ListView = (function(_super) {
      __extends(ListView, _super);

      function ListView() {
        _ref3 = ListView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      ListView.prototype.el = $('body');

      ListView.prototype.initialize = function() {
        _.bindAll(this);
        this.collection = new List;
        this.collection.bind('add', this.appendItem);
        this.counter = 0;
        return this.render();
      };

      ListView.prototype.render = function() {
        $(this.el).append('<button>Add List Item</button>');
        return $(this.el).append('<ul></ul>');
      };

      ListView.prototype.addItem = function() {
        var item;
        this.counter++;
        item = new Item;
        item.set({
          part2: "" + (item.get('part2')) + " " + this.counter
        });
        return this.collection.add(item);
      };

      ListView.prototype.appendItem = function(item) {
        var item_view;
        item_view = new ItemView({
          model: item
        });
        return $('ul').append(item_view.render().el);
      };

      ListView.prototype.events = {
        'click button': 'addItem'
      };

      return ListView;

    })(Backbone.View);
    Backbone.sync = function(method, model, success, error) {
      return success();
    };
    return list_view = new ListView;
  });

}).call(this);
