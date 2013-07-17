jQuery -> 
	
	class Item extends Backbone.Model
		defaults:
			part1: 'Hello'
			part2: 'Backbone'

	class List extends Backbone.Collection
		model: Item

	class ItemView extends Backbone.View

		tagname:'div'

		id: 'boarder'

		initialize: ->
			_.bindAll @

		render: ->
			$(@el).html "<div id='list-item'>#{@model.get 'part1'} #{@model.get 'part2'}!</div>"
			$(@el).slideUp("slow");
			$(@el).slideDown("slow");
			console.log @
			@

	class ListView extends Backbone.View

		el: $ 'body'

		initialize: ->

			_.bindAll @

			@collection = new List
			@collection.bind 'add', @appendItem

			@counter = 0
			@render()

		render: ->
			$(@el).append '<button>Add List Item</button>'
			$(@el).append '<ul></ul>'

		addItem: ->
			@counter++
			item = new Item
			item.set part2: "#{item.get 'part2'} #{@counter}"
			@collection.add item

		appendItem: (item) ->

			item_view = new ItemView model: item
			$('ul').append item_view.render().el

		events: 'click button': 'addItem'

	list_view = new ListView
		
