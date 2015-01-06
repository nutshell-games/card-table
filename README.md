card-table
==========


Server
======
- log in user
- create session
- set # of players
  - generates screen manifest
    (for example, 2 players)
    - 1 horizontal, game board, host, !1920x1080  (! = fixed)
    - 1 vetrical, desktop, host, ~1280x800   (~ = variable)
    - 1 player, handheld, mobile device, ~568x320  
    - 1 player, handheld, mobile device, ~568x320
- open session
  - set required screens
  - set required players
- confirm players
- confirm screens 
  - confirm connection
  - confirm assets preloaded
  - confirm game scene 
- launch session


- check session key to authorize method calls / document access


Client
======
- bind controls
  - smart-touch
  - multitouch
- connect to server
- log in user
- join session (as player)
- register screen

- preload assets

- enter game scene


GAMEPLAY
========

- select decks for game
- generate master deck manifest
- create nodes from deck manifest
- place all nodes in host screen

- map active edges along host screen into player screen
- map active edges along player screen into host screen

- map playpoints on host screen

- reorder deck into fan
- send card to front
- send card to back

- indicate on host screen, number of cards on each player screen

- select/unselect multiple cards 

- draw card out of deck
- draw card into player screen
- draw seletion into player screen
- flip card
- play card into host screen
- play selection into host screen

- gather selection into a deck
- add card to deck
- indicate how many cards in a deck
- shuffle a deck


ARCHITECTURE
============


REQUIRED OBJECTS
- Screen
  - session_id

- Session
  - game_id

- User
  - session_token


CUSTOMIZABLE OBJECTS

- Player
  DEFAULT ATTRIBUTES:
  - user_id
  - table_position
  - name
  - avatar
  - primary_color

  CUSTOM ATTRIBUTES:
  (for a poker game)
  - value_in_hand
  - chips_$1
  - chips_$5
  - chips_$10
  - chips_$25
  - chips_$100

- Gamestate:
  DEFAULT ATTRIBUTES:
  - name (unique)
  - classes: Array<String>

  CUSTOM ATTRIBUTES:
  (global, for a poker game)
  - player_with_action
  - player_as_dealer
  - player_posting_small_blind
  - player_posting_large_blind
  - small_blind
  - large_blind
  - ante

  (current bet, for a poker game)
  - total_value
  - chips_$1
  - chips_$5
  - chips_$10
  - chips_$25
  - chips_$100
  - player_betting

- Node
  DEFAULT ATTRIBUTES:
  - name (unique)
  - classes: Array<String>
  - size: Array     (global units)
  - position: Array (if a child, within parent's coordinate system)
  - rotation: Array (if a child, within parent's coordinate system) 
  - scale: Array    (if a child, within parent's coordinate system)
  - z_index (if 2D renderer)
  - owner_id: (the player who is currently interacting with it)
  - children: (ids of nodes)
  - anchor: Array (if 2D renderer, where center of sprite is anchored, values: 0 - 1, [0.5,0.5] = center of node)


  CUSTOM ATTRIBUTES: 
  (for a playing card node)
  - isFlipped: Boolean
  - suit:
  - rank:
  - front_image
  - back_image

  CUSTOM ATTRIBUTES: 
  (for a playing card play point)
  (an active edge or hotspot)
  - pass_position: Boolean (activated node will receive 
  - pass_rotation: Boolean (activated node will receive this rotation)
  - pass_isFlipped: Boolean



