
/** some globals **/
var circleRadius = 15
var strokeWidthOuter = 6
var strokeWidthInner = 2
var labelFontSize = 20
var guideColor = 'white'

/**
 * names map to stage images in assets/stages
 */
var stageJSON = {
  "Outskirts": {
    canvasSize: [1198, 492],
    canvasOffset: [41, 32]
  },
  "Stadium": {
    canvasSize: [1188, 521],
    canvasOffset: [46, 3]
  },
  "Desert": {
    canvasSize: [1092, 492],
    canvasOffset: [94, 32]
  },
  "Elevator": {
    canvasSize: [1280, 455],
    canvasOffset: [0, 79]
  },
  "Factory": {
    canvasSize: [1242, 481],
    canvasOffset: [19, 51]
  },
  "Streets": {
    canvasSize: [1275, 497],
    canvasOffset: [3, 27]
  },
  "Sewer": {
    canvasSize: [1198, 492],
    canvasOffset: [41, 32]
  },
  "Pool": {
    canvasSize: [1168, 525],
    canvasOffset: [56, 0]
  },
  "Subway": {
    canvasSize: [1014, 492],
    canvasOffset: [133, 32]
  },
  "Room": {
    canvasSize: [1063, 531],
    canvasOffset: [108, 19]
  }
}

/**
 * like-angles should be adjacent to be grouped visually
 * wall and ground property will "invalidate" the angle if character is out of position
 */
var characterJSON = {
  "Toxic": {
    "color": "#ff3913",
    "strokeColor": "#75ff13",
    "angles": [
      {
        "name": "up",
        "degrees": -57
      },
      {
        "name": "ground-down",
        "degrees": 25,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 41
      },
      {
        "name": "air-down",
        "degrees": 35
      },
      {
        "name": "spike-forward",
        "degrees": 21
      },
      {
        "name": "spike-backward",
        "degrees": 106
      }
    ]
  },
  "Latch": {
    "color": "lightgreen",
    "strokeColor": "green",
    "angles": [
      {
        "name": "up",
        "degrees": -38
      },
      {
        "name": "ground-down",
        "degrees": 28,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 38
      },
      {
        "name": "air-down",
        "degrees": 38
      },
      {
        "name": "spike-forward",
        "degrees": 66
      },
      {
        "name": "spike-backward",
        "degrees": -116
      },
      {
        "name": "wall-down",
        "degrees": 60,
        "wall": "true"
      }
    ]
  },
  "Raptor": {
    "color": "red",
    "strokeColor": "purple",
    "angles": [
      {
        "name": "up",
        "degrees": -60
      },
      {
        "name": "ground-down",
        "degrees": 30,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 42
      },
      {
        "name": "air-down",
        "degrees": 42
      },
      {
        "name": "spike-forward",
        "degrees": 83
      },
      {
        "name": "spike-backward",
        "degrees": 97
      }
    ]
  },
  "Jet": {
    "color": "lightskyblue",
    "strokeColor": "royalblue",
    "angles": [
      {
        "name": "up",
        "degrees": -60
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 35
      },
      {
        "name": "air-down",
        "degrees": 35
      },
      {
        "name": "spike-forward",
        "degrees": 80
      },
      {
        "name": "spike-backward",
        "degrees": 100
      }
    ]
  },
  "Nitro": {
    "color": "white",
    "strokeColor": "black",
    "angles": [
      {
        "name": "up",
        "degrees": -20
      },
      {
        "name": "ground-down",
        "degrees": 62,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 41
      },
      {
        "name": "air-down",
        "degrees": 62
      },
      {
        "name": "spike-forward",
        "degrees": 83
      },
      {
        "name": "spike-backward",
        "degrees": 180
      }
    ]
  },
  "Doombox": {
    "color": "#444",
    "strokeColor": "royalblue",
    "angles": [
      {
        "name": "up",
        "degrees": -60
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 45
      },
      {
        "name": "air-down",
        "degrees": 64
      },
      {
        "name": "spike-forward",
        "degrees": 59
      },
      {
        "name": "spike-backward",
        "degrees": 160
      }
    ]
  },
  "Grid": {
    "color": "yellow",
    "strokeColor": "mediumpurple",
    "angles": [
      {
        "name": "up",
        "degrees": -50
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 28
      },
      {
        "name": "air-down",
        "degrees": 15
      },
      {
        "name": "spike-forward",
        "degrees": 32
      },
      {
        "name": "spike-backward",
        "degrees": 117
      }
    ]
  },
  "Switch": {
    "color": "slategrey",
    "strokeColor": "navy",
    "angles": [
      {
        "name": "up",
        "degrees": -120
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "ground": "true"
      },
      {
        "name": "special",
        "degrees": 17
      },
      {
        "name": "smash",
        "degrees": 38
      },
      {
        "name": "air-down",
        "degrees": 38
      },
      {
        "name": "spike-forward",
        "degrees": 71
      },
      {
        "name": "spike-backward",
        "degrees": 109
      }
    ]
  },
  "Candyman": {
    "color": "gold",
    "strokeColor": "brown",
    "angles": [
      {
        "name": "up",
        "degrees": -25
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 70
      },
      {
        "name": "air-down",
        "degrees": 8
      },
      {
        "name": "spike-forward",
        "degrees": 25
      },
      {
        "name": "spike-backward",
        "degrees": -105
      }
    ]
  },
  "Sonata": {
    "color": "#3349cb",
    "strokeColor": "darkviolet",
    "angles": [
      {
        "name": "up",
        "degrees": -20
      },
      {
        "name": "smash",
        "degrees": 55
      },
      {
        "name": "air-down",
        "degrees": 55
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "ground": "true"
      },
      {
        "name": "spike-forward",
        "degrees": 55
      },
      {
        "name": "spike-backward",
        "degrees": -165
      }
    ]
  },
  "Dice": {
    "color": "saddlebrown",
    "strokeColor": "#c8de0a",
    "angles": [
      {
        "name": "up",
        "degrees": -80
      },
      {
        "name": "air-down",
        "degrees": 46
      },
      {
        "name": "ground-down",
        "degrees": 46,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 30
      },
      {
        "name": "spike-forward",
        "degrees": 80
      },
      {
        "name": "spike-backward",
        "degrees": 110
      }
    ]
  },
  "DustAndAshes": {
    "color": "#5d68b3",
    "strokeColor": "#23da7d",
    "angles": [
      {
        "name": "up",
        "degrees": -15
      },
      {
        "name": "air-down",
        "degrees": 21
      },
      {
        "name": "ground-down",
        "degrees": 57,
        "ground": "true"
      },
      {
        "name": "smash",
        "degrees": 33
      },
      {
        "name": "spike-forward",
        "degrees": 44
      },
      {
        "name": "spike-backward",
        "degrees": 163
      }
    ]
  }
}

/** angle aliases for labels */
var angleAlias = {
  "up": "UP",
  "ground-down": "GD",
  "smash": "SMASH",
  "air-down": "AD",
  "spike-forward": "SK-F",
  "spike-backward": "SK-B",
  "wall-down": "WD"
}

var canvas = document.getElementById('myCanvas')
var stageBounds, startX, startY
var offsetX = canvas.getBoundingClientRect().left;
var offsetY = canvas.getBoundingClientRect().top;
var dragok = false;
var labels = [], labelsOn = false
var guides = [], guidesOn = false

window.onresize = function() {
  offsetX = canvas.getBoundingClientRect().left;
  offsetY = canvas.getBoundingClientRect().top;
}

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

function drawLine(start, degrees) {
  // use canvas width * 2 to ensure line is long enough in any situation
  var end = new Point(start.x + canvas.getBoundingClientRect().width * 2, start.y)
  var line = new Path()
  line.add(start, end)
  line.rotate(degrees, start)

  return line
}

function drawAngle(properties) {
  var angle = properties.curAngle
  //if(angle.reflections == 0) angle.reflections = 1
  var degrees = properties.facing == 'left' ? (angle.degrees + 180) * -1 : angle.degrees
  var start = new Point(properties.x, properties.y)

  var invalid = false // no use-y for now
  for(var i = 0; i <= angle.reflections; ++i) {
    /** text label */
    if(labelsOn && i == 0) {
      var reposition = 0 // will turn true if label is too close to another
      var done = false
      do {
        var label = new PointText(start)
        var fontSize = labelFontSize
        var yOffset = degrees > 90 || degrees < -90 ? fontSize : fontSize * -0.4
        label.position.x += circleRadius + 5 + reposition
        label.position.y += yOffset
        label.rotate(degrees, start)
        label.fillColor = 'white'
        label.fontSize = fontSize
        label.fontWeight = 'bold'
        label.fontFamily = 'Arial'
        var content = Array.isArray(angle.labels) ? angle.labels.join(' / ') : angle.name;
        label.content = content.toUpperCase()
        label.shadowColor = 'black'
        label.shadowBlur = 5
        //label.strokeWidth = 1

        if(label && (degrees > 90 || degrees < -90))
          label.rotate(180);

        // check proximity
        if(labels.length == 0) done = true
        else {
          var counter = 0
          for(var j = 0; j < labels.length; j++) {
            counter++
            var compare = labels[j]
            if(label.bounds.intersects(compare.bounds)) {
              reposition = reposition + label.bounds.intersect(compare.bounds).height + 10;
              label.remove()
              break;
            } else {
              if(counter == labels.length) done = true
            }
          }

        }
      } while (!done)

      labels.push(label)
    }

    var line = drawLine(start, degrees)

    // get new starting point from reflection point
    var intersections = line.getIntersections(stageBounds);
    //for(var i in intersections) console.log(intersections[i].point.x, intersections[i].point.y)
    var intersectPoint = intersections.length ? intersections[intersections.length-1].point : false
    if(!intersectPoint) break

    // outer line
    new Path({
      segments: [start, intersectPoint],
      strokeWidth: strokeWidthOuter,
      strokeColor: invalid ? 'grey' : properties.strokeColor
    }).clone().style = { // inner line
      strokeWidth: strokeWidthInner,
      strokeColor: invalid ? 'grey' : properties.color
    }

    var vector = intersectPoint - start

    var arrows = new Group()
    if(guidesOn) {
      arrows.addChildren(addArrows(start, vector, 1, true))
    }

    // new start for next reflection
    start = intersectPoint.clone()

    /**
     * Handle Candyman warp
     */
    if(properties.name == 'Candyman' && angle.special > i) {
      var oldStart = start.clone()

      // move start to opposite wall
      if(start.x >= canvas.getBoundingClientRect().width - 1)
        start.x = 1;
      else if(start.x <= 1)
        start.x = canvas.getBoundingClientRect().width

      if(start.y >= canvas.getBoundingClientRect().height - 1)
        start.y = 0
      else if(start.y <= 1)
        start.y = canvas.getBoundingClientRect().height

      if(guidesOn) {
        // warp indicator
        new Path({
          segments: [oldStart, start],
          strokeWidth: 1,
          dashArray: [1, 5],
          strokeColor: 'white'
        })

        var warpVector = start - oldStart
        arrows.addChildren(addArrows(oldStart, warpVector, 1, false))
      }

    } else {
      // on all reflections
      degrees *= -1
      // on side reflections only
      if(start.x >= canvas.getBoundingClientRect().width - 1 || start.x <= 1)
        degrees += 180
    }

    // style all arrows
    arrows.strokeWidth = 4
    arrows.strokeColor = guideColor
    arrows.strokeCap = 'round'
    guides.push(arrows)
  }
}

function addArrows(start, vector, count, cap) {
  var arrows = []
  var arrowVector = vector.normalize(10)
  var division = vector / (count + 1)
  var arrowHead = start + division;
  for(var i = 0; i < count; i++) {
    arrows.push(new Path([ arrowHead + arrowVector.rotate(160), arrowHead, arrowHead + arrowVector.rotate(-160) ]))
    arrowHead += division
  }
  if(cap) {
    arrowHead = start + vector;
    arrows.push(new Path([ arrowHead + arrowVector.rotate(160), arrowHead, arrowHead + arrowVector.rotate(-160) ]))
  }

  return arrows
}

// redraw the scene
function draw() {
  paper.project.activeLayer.removeChildren()
  labels = []

  for(var i = 0; i < loadedChars.length; i++) {
    var char = loadedChars[i]
    if(!char.x) {
      char.x = Math.floor(Math.random() * (canvas.getBoundingClientRect().width - 400)) + 200
      char.y = Math.floor(Math.random() * (canvas.getBoundingClientRect().height - 100)) + 50
    }

    for(var j = 0; j < char.angles.length; j++) {
      char.curAngle = char.angles[j]
      if(char.curAngle.visible) drawAngle(char);
    }

    // draw circle last so it's on top
    new Path.Circle({
      center: [char.x, char.y],
      radius: circleRadius,
      fillColor: char.color,
      strokeColor: char.strokeColor,
      strokeWidth: 3
    })

    labels.forEach(function(e) { e.bringToFront(); })
    guides.forEach(function(e) { e.bringToFront(); })
  }

  paper.view.update()
  window.canvas = canvas;
  window.sb = stageBounds;
}

// handle mousedown events
function myDown(e) {

  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  var mx = parseInt(e.clientX - offsetX);
  var my = parseInt(e.clientY - offsetY);

  // test each shape to see if mouse is inside
  dragok = false;
  for(var i = 0; i < loadedChars.length; i++){
    var s = loadedChars[i];
    // decide if the shape is a rect or circle
    if(s.width){
      // test if the mouse is inside this rect
      if(mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height){
        // if yes, set that rects isDragging=true
        dragok = true;
        s.isDragging = true;
      }
    } else {
      var dx = s.x - mx;
      var dy = s.y - my;
      // test if the mouse is inside this circle
      if(dx * dx + dy * dy < circleRadius * circleRadius) {
        dragok = true;
        s.isDragging = true;
      }
    }
  }
  // save the current mouse position
  startX = mx;
  startY = my;
}

// handle mouseup events
function myUp(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for(var i = 0; i < loadedChars.length; i++){
    loadedChars[i].isDragging = false;
  }
}

// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx = mx - startX;
    var dy = my - startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for(var i = 0; i < loadedChars.length; i++){
      var s = loadedChars[i];
      if(s.isDragging){
        s.x += dx;
        s.y += dy;
      }
    }

    // redraw the scene with the new rect positions
    draw();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;

  }
}

var stages = [], characters = [], loadedChars = []

function loadChar(charName) {
  var char = loadedChars.find(function(e){ return e.name == charName })
  if(!char) {
    char = characters.find(function(e){ return e.name == charName })
    loadedChars.push(char)
  }

  return char
}

$('document').ready(function() {
  /** stages */
  for(var i in stageJSON) {
    var stage = stageJSON[i]
    stage.name = i
    stages.push(stage)
    $('select[name="stage"]').append('<option value="'+stage.name+'">'+stage.name+'</option>')
  }

  /**
   * Stage change event
   */
  $('select[name="stage"]').on('change', function(e) {
    var stageName = $(e.target).find(':selected').attr('value');
    var stage = stages.find(function(e) { return e.name == stageName });

    paper.view.viewSize.width = stage.canvasSize[0]
    paper.view.viewSize.height = stage.canvasSize[1]

    stageBounds = new Path()
    stageBounds.add(
      new Point(0, 0),
      new Point(canvas.getBoundingClientRect().width, 0),
      new Point(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height),
      new Point(0, canvas.getBoundingClientRect().height)
    )
    stageBounds.closed = true

    $('#myCanvas').css('left', stage.canvasOffset[0])
    $('#myCanvas').css('top', stage.canvasOffset[1])
    $('#wrapper').css('background-image', 'url(assets/stages/'+stageName+'.png)')

    setTimeout(function() { $(window).trigger('resize'); }, 500)

    draw()
  })

  // select first stage
  $('select[name="stage"]').change()

  /** add chars and angles */
  for(var i in characterJSON) {
    var char = characterJSON[i]
    char.name = i
    char.angles.push({ name: 'straight', degrees: 0})
    char.facing = 'right'
    char.isDragging = false
    characters.push(char)

    $('#menu ul').append('<li id='+char.name+'><span class="character">'+char.name+'</span> <span class="turn">&#8634;</span><ol class="angles"></ol></li>')
    var prevAngle = null // for combining like angles
    for(var j = 0; j < char.angles.length; j++) {
      var angle = char.angles[j]
      angle.reflections = 0
      if(prevAngle && prevAngle.degrees == angle.degrees) {
        $('li.'+char.name+'.'+prevAngle.name).append('<br>/ '+angle.name)
        if(!Array.isArray(prevAngle.labels))
          prevAngle.labels = []
        prevAngle.labels.push(angleAlias[angle.name] || angle.name)
      } else {
        $('li#'+char.name+' ol').append('<li class="'+char.name+' '+angle.name+'"><span class="minus">-</span> '+angle.name+' <span class="plus">+</span></li>')
        angle.labels = [angleAlias[angle.name] || angle.name]
        prevAngle = angle

        // special butttons
        if(char.name == 'Candyman' /* && ['up', 'air-down', 'ground-down'].indexOf(angle.name) > -1 */) {
          $('li.'+char.name+'.'+angle.name).append('<span class="special" title="Add bounces (+) and click again to warp them">S</span>')
        }
      }
    }
  }

  /** toggle chars */
  $('.character').on('click', function(e) {
    var charName = $(e.target).text()
    var isLoaded = loadedChars.find(function(e){ return e.name == charName })
    if(!isLoaded) {
      loadChar(charName)
    } else {
      // unload em
      var i = loadedChars.findIndex(function(e){ return e.name == charName })
      loadedChars.splice(i, 1)
    }

    draw()
  })

  /** turn around */
  $('.turn').on('click', function(e) {
    var charName = $(e.target).parent().attr('id')
    var char = loadedChars.find(function(e){ return e.name == charName })
    if(!char) char = characters.find(function(e){ return e.name == charName })
    char.facing = char.facing == 'right' ? 'left' : 'right'

    draw()
  })

  /** toggle angles */
  $('.angles li').on('click', function(e) {
    var classes = $(e.target).attr('class').split(/\s+/)
    var charName = classes[0]
    var angleName = classes[1]

    var char = loadChar(charName)

    var angle = char.angles.find(function(e){ return e.name == angleName })
    if(angle.visible) angle.visible = false
    else {
      angle.visible = true
    }

    draw()
  })

  /**
   * Add/subtract angle click event
   */
  $('.plus, .minus').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()

    var classes = $(e.target).parent().attr('class').split(/\s+/)
    var charName = classes[0]
    var angleName = classes[1]

    var char = loadChar(charName);
    var angle = char.angles.find(function(e){ return e.name == angleName })

    var sign = $(e.target).attr('class')
    if(angle.visible) {
      if(sign == 'plus') angle.reflections += 1
      else angle.reflections -= 1
    }

    if(sign == 'plus')
      angle.visible = true;

    if(angle.reflections < 0) {
      angle.reflections = 0
      angle.visible = false
    }

    draw()
  })

  /**
   * Special angle click event
   * toggle or increment Candyman warp
   */
  $('.special').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()

    var classes = $(e.target).parent().attr('class').split(/\s+/)
    var charName = classes[0]
    var angleName = classes[1]

    var char = loadChar(charName);

    // show angle
    var angle = char.angles.find(function(e){ return e.name == angleName })
    angle.visible = true
    if(angle.reflections == 'undefined' || isNaN(angle.reflections))
      angle.reflections = 0

    if(charName == 'Candyman' && (!angle.special || angle.special < angle.reflections)) {
      if(!angle.special)
        angle.special = 1
      else angle.special++
      // give at least one reflection to properly visualize special
      if(angle.reflections <= 0)
        angle.reflections = 1
      if(!guidesOn)
        guidesOn = true
    } else {
      angle.special = !angle.special
    }

    draw()
  })
})

/**
 * Option bar events
 */
$('#overlay').on('click', function(e) {
  e.preventDefault
  var bg = $('#myCanvas').css('background-color')
  if(bg == 'rgba(0, 0, 0, 0)') $('#myCanvas').css('background-color', 'rgba(0, 0, 0, 0.7)')
  else $('#myCanvas').css('background-color', 'rgba(0, 0, 0, 0)')
})

$('#labels').on('click', function(e) {
  e.preventDefault
  labelsOn = !labelsOn
  draw()
})

$('#guides').on('click', function(e) {
  e.preventDefault
  guidesOn = !guidesOn
  draw()
})

$('#clear').on('click', function(e) {
  paper.project.activeLayer.removeChildren()
  loadedChars = []
  characters.forEach(function(e) {
    e.angles.forEach(function(e) { e.visible = false; e.reflections = 0; })
  })
})
