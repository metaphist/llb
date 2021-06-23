/** TODO
 * Nosy little one aren't you...
 *
 * Add Sonata Special Angles
   * Learn to draw segments
   * Add 45 segments to each 
   * limit to 3 and make last a normal reflection
   * Add "nice" & "bring it" angles as third reflection
 * Add character portraits instead of drawing a circle
   * Ball should be placed in the caracter's hitbox (must be shown)
   * Add button to enable/disable character views
 **/

/** some globals **/
var circleRadius = 15
var strokeWidthOuter = 6
var strokeWidthInner = 2
var labelFontSize = 20
var guideColor = 'white'


var ballRadius = 10
var ballDiameter = 2 * ballRadius

/**
 * names map to stage images in assets/stages
 */
var stageJSON = {
  "Outskirts": {
    canvasSize: [1240, 510],
    canvasOffset: [43, 33]
  },
  "Stadium": {
    canvasSize: [1230, 540],
    canvasOffset: [48, 4]
  },
  "Desert": {
    canvasSize: [1130, 510],
    canvasOffset: [98, 33]
  },
  "Elevator": {
    canvasSize: [1492, 522],
    canvasOffset: [0, 92]
  },
  "Factory": {
    canvasSize: [1400, 542],
    canvasOffset: [21, 58]
  },
  "Streets": {
    canvasSize: [1320, 515],
    canvasOffset: [3, 29]
  },
  "Sewer": {
    canvasSize: [1240, 510],
    canvasOffset: [43, 33]
  },
  "Pool": {
    canvasSize: [1210, 575],
    canvasOffset: [58, 0]
  },
  "Subway": {
    canvasSize: [1050, 510],
    canvasOffset: [138, 33]
  },
  "Room": {
    canvasSize: [1100, 550],
    canvasOffset: [113, 20]
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
    "img_name": "toxic",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [208, 149],
        "hurtboxes": [[0, 0, 208, 149]],
        "hitboxes": [[0, 0, 208, 149]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -57,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 25,
        "validWhen": ["swing"],
        "customOffset": 110,
      },
      {
        "name": "smash",
        "degrees": 41,
        "validWhen": ["swing"],
        "customOffset": 110,
      },
      {
        "name": "air-down",
        "degrees": 35,
        "validWhen": ["swing"],
        "customOffset": 70,
      },
      {
        "name": "spike-forward",
        "degrees": 21,
        "validWhen": ["swing"],
        "customOffset": 70,
      },
      {
        "name": "spike-backward",
        "degrees": 106,
        "validWhen": ["swing"]
      }
    ]
  },
  "Latch": {
    "color": "lightgreen",
    "strokeColor": "green",
    "img_name": "latch",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [209, 163],
        "hurtboxes":[[43, 11, 80, 136]],
        "hitboxes":[[78, 11, 124, 136]],
        "canMirror": true,
      },
      {
        "name": "smash",
        "imgSize": [235, 231],
        "hurtboxes":[[76, 80, 80, 136]],
        "hitboxes":[[61, 8, 110, 72], [111, 80, 124, 136]],
      },
      {
        "name": "spike",
        "imgSize": [141, 248],
        "hurtboxes":[[33, 0, 80, 136]],
        "hitboxes":[[13, 78, 120, 170]],
      },
      {
        "name": "wallswing",
        "imgSize": [182, 158],
        "hurtboxes":[[22, 22, 80, 136]],
        "hitboxes":[[52, 0, 130, 158]],
        "wall": true,
      },
      {
        "name": "bunt",
        "imgSize": [227, 188],
        "hurtboxes":[[68, 40, 80, 136]],
        "hitboxes":[[148, 0, 79, 74], [103, 74, 124, 102]],
      },
      {
        "name": "grab",
        "imgSize": [208, 141],
        "hurtboxes":[[49, 0, 80, 135]],
        "hitboxes":[[84, 0, 124, 136]],
      },
      {
        "name": "stand",
        "imgSize": [150, 149],
        "hurtboxes":[[46, 0, 80, 136]],
        "hitboxes":[],
      },
      {
        "name": "crouch",
        "imgSize": [155, 82],
        "hurtboxes":[[26, 5, 80, 60]],
        "hitboxes":[],
      },
      {
        "name": "lay",
        "imgSize": [196, 69],
        "hurtboxes":[[28, 1, 136, 45]],
        "hitboxes":[],
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -38,
        "validWhen": ["swing", "wallswing"],
        "mirror": true,
      },
      {
        "name": "ground-down",
        "degrees": 28,
        "validWhen": ["swing"],
        "mirror": true,
      },
      {
        "name": "smash",
        "degrees": 38,
        "validWhen": ["smash", "swing"], //currently this angle gets combined with the next angle
        "mirror": true,
        "customOffset": 110,
      },
      {
        "name": "air-down",
        "degrees": 38,
        "validWhen": ["swing"],
        "mirror": true,
      },
      {
        "name": "spike-forward",
        "degrees": 66,
        "validWhen": ["spike"]
      },
      {
        "name": "spike-backward",
        "degrees": -116,
        "validWhen": ["spike"]
      },
      {
        "name": "wall-down",
        "degrees": 120,
        "validWhen": ["wallswing"],
        "customOffset": 40,
      },
      {
        "name": "special-down-forward",
        "degrees": 18,
        "validWhen": ["swing"],
        "mirror": true,
        "customOffset": 110,
      }
    ]
  },
  "Raptor": {
    "color": "red",
    "strokeColor": "purple",
    "img_name": "raptor",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [180, 156],
        "hurtboxes": [[0, 0, 180, 156]],
        "hitboxes": [[0, 0, 180, 156]],
        "canMirror": true,
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 30,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 42,
        "validWhen": ["swing"]
      },
      {
        "name": "air-down",
        "degrees": 42,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 83,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": 97,
        "validWhen": ["swing"]
      }
    ]
  },
  "Jet": {
    "color": "lightskyblue",
    "strokeColor": "royalblue",
    "img_name": "jet",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [170, 165],
        "hurtboxes": [[0, 0, 170, 165]],
        "hitboxes": [[0, 0, 170, 165]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 35,
        "validWhen": ["swing"]
      },
      {
        "name": "air-down",
        "degrees": 35,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 80,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": 100,
        "validWhen": ["swing"]
      }
    ]
  },
  "Nitro": {
    "color": "white",
    "strokeColor": "black",
    "img_name": "nitro",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [236, 170],
        "hurtboxes": [[0, 0, 236, 170]],
        "hitboxes": [[0, 0, 236, 170]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -20,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 62,
        "validWhen": ["swing"]
      },
      {
        "name": "air-down",
        "degrees": 62,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 41,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 83,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": 180,
        "validWhen": ["swing"]
      }
    ]
  },
  "Doombox": {
    "color": "#444",
    "strokeColor": "royalblue",
    "img_name": "db",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [351, 198],
        "hurtboxes": [[0, 0, 351, 198]],
        "hitboxes": [[0, 0, 351, 198]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "validWhen": ["swing"],
        "customOffset": 70,
      },
      {
        "name": "smash",
        "degrees": 45,
        "validWhen": ["swing"],
        "customOffset": 110,
      },
      {
        "name": "air-down",
        "degrees": 64,
        "validWhen": ["swing"],
        "customOffset": 70,
      },
      {
        "name": "spike-forward",
        "degrees": 59,
        "validWhen": ["swing"],
        "customOffset": 110,
      },
      {
        "name": "spike-backward",
        "degrees": 160,
        "validWhen": ["swing"]
      }
    ]
  },
  "Grid": {
    "color": "yellow",
    "strokeColor": "mediumpurple",
    "img_name": "grid",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [242, 180],
        "hurtboxes": [[0, 0, 242, 180]],
        "hitboxes": [[0, 0, 242, 180]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -50,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 28,
        "validWhen": ["swing"],
        "customOffset": 110,
      },
      {
        "name": "air-down",
        "degrees": 15,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 32,
        "validWhen": ["swing"],
        "customOffset": 70,
      },
      {
        "name": "spike-backward",
        "degrees": 117,
        "validWhen": ["swing"]
      }
    ]
  },
  "Switch": {
    "color": "slategrey",
    "strokeColor": "navy",
    "img_name": "switch",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [238, 164],
        "hurtboxes": [[0, 0, 238, 164]],
        "hitboxes": [[0, 0, 238, 164]],
        "canMirror": true,
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -120,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "validWhen": ["swing"]
      },
      {
        "name": "special",
        "degrees": 17,
        "validWhen": ["swing"],
        "mirror": true,
      },
      {
        "name": "smash",
        "degrees": 38,
        "validWhen": ["swing"]
      },
      {
        "name": "air-down",
        "degrees": 38,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 71,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": 109,
        "validWhen": ["swing"]
      }
    ]
  },
  "Candyman": {
    "color": "gold",
    "strokeColor": "brown",
    "img_name": "candy",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [213, 176],
        "hurtboxes": [[0, 0, 213, 176]],
        "hitboxes": [[0, 0, 213, 176]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -25,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 70,
        "validWhen": ["swing"],
        "customOffset": 90,
      },
      {
        "name": "air-down",
        "degrees": 8,
        "validWhen": ["swing"],
        "customOffset": 110,
      },
      {
        "name": "spike-forward",
        "degrees": 25,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": -105,
        "validWhen": ["swing"]
      }
    ]
  },
  "Sonata": {
    "color": "#3349cb",
    "strokeColor": "darkviolet",
    "img_name": "sonata",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [213, 165],
        "hurtboxes": [[0, 0, 213, 165]],
        "hitboxes": [[0, 0, 213, 165]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -20,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 55,
        "validWhen": ["swing"]
      },
      {
        "name": "air-down",
        "degrees": 55,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 55,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": -165,
        "validWhen": ["swing"]
      },
      {
        "name": "bring-it",
        "degrees": 90,
        "validWhen": ["swing"],
        "hidden": true,
      },
      {
        "name": "nice",
        "degrees": -90,
        "validWhen": ["swing"],
        "hidden": true,
      }
    ]
  },
  "Dice": {
    "color": "saddlebrown",
    "strokeColor": "#c8de0a",
    "img_name": "dice",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [201, 169],
        "hurtboxes": [[0, 0, 201, 169]],
        "hitboxes": [[0, 0, 201, 169]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -80,
        "validWhen": ["swing"]
      },
      {
        "name": "air-down",
        "degrees": 46,
        "validWhen": ["swing"]
      },
      {
        "name": "ground-down",
        "degrees": 46,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 30,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 80,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-backward",
        "degrees": 110,
        "validWhen": ["swing"]
      }
    ]
  },
  "DustAndAshes": {
    "color": "#5d68b3",
    "strokeColor": "#23da7d",
    "img_name": "dust",
    "baseHeight": 136,
    "poses": [
      {
        "name": "swing",
        "imgSize": [249, 158],
        "hurtboxes": [[0, 0, 249, 158]],
        "hitboxes": [[0, 0, 249, 158]]
      }
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -15,
        "validWhen": ["swing"],
        "customOffset": 100,
      },
      {
        "name": "air-down",
        "degrees": 21,
        "validWhen": ["swing"],
        "customOffset": 100,
      },
      {
        "name": "ground-down",
        "degrees": 57,
        "validWhen": ["swing"],
        "customOffset": 100,
      },
      {
        "name": "smash",
        "degrees": 33,
        "validWhen": ["swing"],
        "customOffset": 100,
      },
      {
        "name": "spike-forward",
        "degrees": 44,
        "validWhen": ["swing"],
        "customOffset": 100,
      },
      {
        "name": "spike-backward",
        "degrees": 163,
        "validWhen": ["swing"],
        "customOffset": 100,
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
  "spike": "SK",
  "wall-down": "WD",
  "nice": "Nice",
  "special-down-forward": "Latchflip"
}

var canvas = document.getElementById('myCanvas')
var ballStageBounds, startX, startY
var ballStageRect
var trueStageRect
var offsetX = canvas.getBoundingClientRect().left;
var offsetY = canvas.getBoundingClientRect().top;
var dragok = false;
var labels = [], labelsOn = false
var guides = [], guidesOn = false
var charImages = [], charImagesOn = true
var showBallImpactLocations = true
var ignoreHitboxCollisions = false

window.onresize = function() {
  offsetX = canvas.getBoundingClientRect().left;
  offsetY = canvas.getBoundingClientRect().top;
}

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

document.documentElement.addEventListener('mouseup', myUp);

var stages = [], characters = [], loadedChars = []

function loadChar(charName) {
  var char = loadedChars.find(function(e){ return e.name == charName });
  if (!char) {
    char = characters.find(function(e){ return e.name == charName });
    loadedChars.push(char);
    $('li#' + charName + ' ol').removeClass("hidden");
  }

  return char;
}

function unloadChar(charName) {
  var i = loadedChars.findIndex(function(e){ return e.name == charName });
  if (i >= 0) {
    loadedChars.splice(i, 1);
    $('li#' + charName + ' ol').addClass("hidden");
  }
}

function addReflectionsToAngle(charName, angleName, amount) {
  var char = loadChar(charName);
  var angle = char.angles.find(function(e){ return e.name == angleName })

  if (angle.visible) {
    angle.reflections += amount
  }

  if (angle.reflections > angle.maxReflections - 1) {
    angle.reflections = angle.maxReflections - 1;
  }

  if (amount > 0) {
    angle.visible = true;
  }

  if (angle.reflections < 0) {
    angle.reflections = 0
    angle.visible = false
  }

  if (angle.visible && charImagesOn) {
    if (angle.validWhen.indexOf(char.pose.name) < 0) {
      for (var j = 0; j < char.poses.length; j++) {
        var pose = char.poses[j];
        if (angle.validWhen.indexOf(pose.name) >= 0) {
          changePoseTo(char, pose);
          break;
        }
      }
    }
  }
}

function addCandySpecialToAngle(charName, angleName) {
  var char = loadChar(charName);
  var angle = char.angles.find(function(e){ return e.name == angleName });

  angle.visible = true;
  if (angle.reflections == 'undefined' || isNaN(angle.reflections)) {
    angle.reflections = 0;
  }

  if (char.name == 'Candyman' && (!angle.special || angle.special < 2)) {
    if (!angle.special) {
      angle.special = 1;
    } else {
      angle.special++;
    }
    // give at least one reflection to properly visualize special
    if (angle.reflections <= 0) {
      angle.reflections = 1;
    }
    if (!guidesOn) {
      guidesOn = true;
    }
  } else {
    angle.special = !angle.special;
  }
}

function flipDirectionFacing(char) {
  var hurtbox = char.getRelativeHurtbox();
  var relativeBallPosition = hurtbox.bottomCenter;

  char.facing = char.facing == 'right' ? 'left' : 'right'

  if (charImagesOn) {
    var nextHurtbox = char.getRelativeHurtbox();
    var delta = hurtbox.bottomCenter - nextHurtbox.bottomCenter;
    char.imgOffset.x += delta.x;
    char.imgOffset.y += delta.y;

    char.x += relativeBallPosition.x * 2;
    char.imgOffset.x -= relativeBallPosition.x * 2;
  }
}

function toggleDirectButtons(char) {
  char.showDirectButtons = !char.showDirectButtons;
}

function toggleMirrorAngles(char) {
  char.mirrorAngles = !char.mirrorAngles;
}

function nextPose(char) {
  var index = char.poses.indexOf(char.pose);
  var pose = char.poses[(index + 1) % char.poses.length];
  changePoseTo(char, pose)
}

function changePoseTo(char, nextPose) {
  var hurtbox = char.getRelativeHurtbox();

  char.pose = nextPose;

  var nextHurtbox = char.getRelativeHurtbox();
  var delta = hurtbox.bottomCenter - nextHurtbox.bottomCenter;
  char.imgOffset.x += delta.x;
  char.imgOffset.y += delta.y;
}

function startDragging(char, dontDragCharImage) {
  dragok = true;
  char.isDragging = true;
  char.dontDragCharImage = dontDragCharImage;
}

function drawLine(start, degrees) {
  // use canvas width * 2 to ensure line is long enough in any situation
  var end = new Point(start.x + canvas.getBoundingClientRect().width * 2, start.y)
  var line = new Path()
  line.add(start, end)
  line.rotate(degrees, start)

  return line
}

function drawAngle(properties, mirrored) {
  var angle = properties.curAngle;
  var degrees = (properties.facing == 'left' ^ mirrored) ? (angle.degrees + 180) * -1 : angle.degrees
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

    var hitHurtBoxCollision = false;
    var hitHurtBoxPoint;
    var hitHurtBox;
    var closestDistance;
    var itHurts = false;
    if (charImagesOn && !ignoreHitboxCollisions) {
      for (var j = 0; j < loadedChars.length; j++) {
        var char = loadedChars[j];
        if (char == properties) {
          continue;
        }
        var hitboxes = char.getHitboxes();
        for (var k = 0; k < hitboxes.length; k++) {
          var hitbox = hitboxes[k];
          var hitboxPath = new Path.Rectangle(hitbox);
          var intersections = line.getIntersections(hitboxPath);
          for (var l = 0; l < intersections.length; l++) {
            var intersection = intersections[l];
            var dist = start.getDistance(intersection.point);
            if (!hitHurtBoxCollision || dist < closestDistance) {
              hitHurtBoxCollision = true;
              hitHurtBoxPoint = intersection.point;
              hitHurtBoxPath = hitboxPath;
              closestDistance = dist;
            }
          }
        }
        var hurtbox = char.getHurtbox();
        var hitboxPath = new Path.Rectangle(hurtbox);
        var intersections = line.getIntersections(hitboxPath);
        for (var l = 0; l < intersections.length; l++) {
          var intersection = intersections[l];
          var dist = start.getDistance(intersection.point);
          if (!hitHurtBoxCollision || dist < closestDistance) {
            hitHurtBoxCollision = true;
            hitHurtBoxPoint = intersection.point;
            hitHurtBoxPath = hitboxPath;
            closestDistance = dist;
            itHurts = true;
          }
        }
      }
    }

    var stopPoint = hitHurtBoxPoint;

    if (!hitHurtBoxCollision) {
      // get new starting point from reflection point
      var intersections = line.getIntersections(ballStageBounds);
      //for(var i in intersections) console.log(intersections[i].point.x, intersections[i].point.y)
      var intersectPoint = intersections.length ? intersections[intersections.length-1].point : false
      if(!intersectPoint) break

      stopPoint = intersectPoint;

      // draw ball hitbox at impact location
      if(showBallImpactLocations) {
        var ballHitbox = new Rectangle(new Point(intersectPoint.x - ballRadius + 2, intersectPoint.y - ballRadius + 2), new Size(ballDiameter - 4, ballDiameter - 4))
        var ballHitboxPath = new Path.Rectangle(ballHitbox)
        ballHitboxPath.strokeColor = 'blue'
        ballHitboxPath.strokeWidth = 4
      }
    }

    // outer line
    new Path({
      segments: [start, stopPoint],
      strokeWidth: strokeWidthOuter,
      strokeColor: invalid ? 'grey' : properties.strokeColor
    }).clone().style = { // inner line
      strokeWidth: strokeWidthInner,
      strokeColor: invalid ? 'grey' : properties.color
    }

    if (hitHurtBoxCollision) {
      if (itHurts) {
        hitHurtBoxPath.fillColor = 'lightskyblue';
      } else {
        hitHurtBoxPath.fillColor = '#ffc2c4';
      }
      hitHurtBoxPath.sendToBack();
      break;
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
      if(start.x >= ballStageRect.x + ballStageRect.width - 1)
        start.x = ballStageRect.x;
      else if(start.x <= ballStageRect.x + 1)
        start.x = ballStageRect.x + ballStageRect.width

      if(start.y >= ballStageRect.y + ballStageRect.height - 1)
        start.y = ballStageRect.y
      else if(start.y <= ballStageRect.y + 1)
        start.y = ballStageRect.y + ballStageRect.height

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
      var hitSides = start.x >= ballStageRect.right - 1 || start.x <= ballStageRect.left + 1
      var hitFloorOrCeiling = start.y >= ballStageRect.bottom - 1 || start.y <= ballStageRect.top + 1

      if(hitSides && hitFloorOrCeiling) {
        // on corners invert direction
        degrees += 180;
        i++; // corner should count as two reflections
      } else if(hitSides) {
        // on side reflections flip angle horizontally
        degrees *= -1
        degrees += 180
      } else {
        // on floor or ceiling reflection flip angle vertically
        degrees *= -1
      }
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

    // Draw character first so it's below lines and icon buttons
    if(charImagesOn) { 
      if (char.parry && char.pose.canParry) {
        var parry = new Raster("assets/characters/parry.png");
        parry.position.x = char.x;
        parry.position.y = char.y;

        var strokeWidth = 4;
        var parryHitbox = new Rectangle(char.x - 50, char.y - 50, 100, 100);
        var parryHitboxPath = new Path.Rectangle(char.x - 50 + strokeWidth / 2, char.y - 50 + strokeWidth / 2, 100 - strokeWidth, 100 - strokeWidth);
        parryHitboxPath.strokeColor = 'green';
        parryHitboxPath.strokeWidth = strokeWidth;
        parryHitboxPath.sendToBack();
        parry.sendToBack();

        if (!ignoreHitboxCollisions) {
          for (var j = 0; j < loadedChars.length; j++) {
            var otherChar = loadedChars[j];
            if (otherChar == char) {
              continue;
            }
            var hitboxes = otherChar.getHitboxes();
            for (var k = 0; k < hitboxes.length; k++) {
              var hitbox = hitboxes[k];
              if (hitbox.intersects(parryHitbox)) {
                parryHitboxPath.fillColor = 'darkviolet';
              }
            }
          }
        }
      }
      var r = new Raster(char.getImage());
      r.position.x = char.x + char.imgOffset.x;
      r.position.y = char.y + char.imgOffset.y;
      if(char.facing == "left") { //TODO: use proper image for left/right not just flipping the sprite
        r.scale(-1, 1);
      }
      if (char.pose.canParry) {
        var ball = new Raster("assets/characters/ball.png");
        ball.position.x = char.x;
        ball.position.y = char.y;
      }
      var hurtbox = char.getRelativeHurtbox();
      var iconSize = new Size(20, 20);
      var iconsX = char.x + hurtbox.bottomCenter.x - 50 + iconSize.width / 2;
      var iconsY = char.y + hurtbox.bottomCenter.y - char.baseHeight - iconSize.height / 2;
      iconsX = Math.max(iconSize.width / 2, iconsX);
      iconsY = Math.max(iconSize.height / 2, iconsY);
      var icon = new Raster("assets/icons/flip.png");
      icon.position.x = iconsX;
      icon.position.y = iconsY;
      icon.char = char;
      icon.onMouseDown = function(event) {
        flipDirectionFacing(this.char);
        draw();
      }
      var icon = new Raster("assets/icons/toggle.png");
      icon.position.x = iconsX + 22;
      icon.position.y = iconsY;
      icon.char = char;
      icon.onMouseDown = function(event) {
        toggleDirectButtons(this.char);
        draw();
      }
      var icon = new Raster("assets/icons/pose.png");
      icon.position.x = iconsX + 44;
      icon.position.y = iconsY;
      icon.char = char;
      icon.onMouseDown = function(event) {
        nextPose(this.char);
        draw();
      }
      if (char.pose.canParry) {
        var icon = new Raster("assets/icons/parry.png");
        icon.position.x = iconsX + 66;
        icon.position.y = iconsY;
        icon.char = char;
        icon.onMouseDown = function(event) {
          this.char.parry = !this.char.parry;
          draw();
        }
      }
      if (char.pose.canMirror) {
        var icon = new Raster("assets/icons/mirror.png");
        icon.position.x = iconsX + 88;
        icon.position.y = iconsY;
        icon.char = char;
        icon.onMouseDown = function(event) {
          toggleMirrorAngles(this.char);
          draw();
        }
      }
    } else {
      new Path.Circle({
        center: [char.x, char.y],
        radius: circleRadius,
        fillColor: char.color,
        strokeColor: char.strokeColor,
        strokeWidth: 3
      })
    }

    for(var j = 0; j < char.angles.length; j++) {
      char.curAngle = char.angles[j]
      if ((charImagesOn && char.curAngle.validWhen.indexOf(char.pose.name) < 0) || char.curAngle.hidden) {
        continue;
      }
      if (char.curAngle.visible) {
        if (char.mirrorAngles && char.pose.canMirror && char.curAngle.mirror) {
          drawAngle(char, true);
        }
        drawAngle(char, false);
      }
      if (char.showDirectButtons) {
        if(char.curAngle.labels === undefined) {
          //angles that are identical to other angles have no labels; skip those
          continue;
        }
        var offset = 80;
        if (char.curAngle.customOffset) {
          offset = char.curAngle.customOffset;
        }
        var icon = new Raster("assets/icons/plus.png")
        var vector = new Point(offset + j * 1, 0);
        vector = vector.rotate(char.curAngle.degrees);
        if (char.facing == 'left') {
          vector.x *= -1;
        }
        icon.position.x = char.x + vector.x;
        icon.position.y = char.y + vector.y;
        icon.angleName = char.curAngle.name;
        icon.charName = char.name;
        icon.labels = char.curAngle.labels;
        icon.onMouseEnter = function(event) {
          //TODO: show tooltip with angle label
          //console.log(this.charName + " " + this.labels + "+");
        }
        icon.onMouseDown = function(event) {
          addReflectionsToAngle(this.charName, this.angleName, 1);
          draw();
        }
        if(char.curAngle.visible){
          var icon = new Raster("assets/icons/minus.png")
          var vector = new Point(offset - 20 + j * 1, 0);
          vector = vector.rotate(char.curAngle.degrees);
          if (char.facing == 'left') {
            vector.x *= -1;
          }
          icon.position.x = char.x + vector.x;
          icon.position.y = char.y + vector.y;
          icon.angleName = char.curAngle.name;
          icon.charName = char.name;
          icon.labels = char.curAngle.labels;
          icon.onMouseEnter = function(event) {
            //TODO: show tooltip with angle label
            //console.log(this.charName + " " + this.labels + "-");
          }
          icon.onMouseDown = function(event) {
            addReflectionsToAngle(this.charName, this.angleName, -1);
            draw();
          }
        }
        if(char.name == "Candyman"){
          var icon = new Raster("assets/icons/special.png")
          var vector = new Point(offset + 20 + j * 1, 0);
          vector = vector.rotate(char.curAngle.degrees);
          if (char.facing == 'left') {
            vector.x *= -1;
          }
          icon.position.x = char.x + vector.x;
          icon.position.y = char.y + vector.y;
          icon.angleName = char.curAngle.name;
          icon.charName = char.name;
          icon.labels = char.curAngle.labels;
          icon.onMouseEnter = function(event) {
            //TODO: show tooltip with angle label
            //console.log(this.charName + " " + this.labels + "-");
          }
          icon.onMouseDown = function(event) {
            addCandySpecialToAngle(this.charName, this.angleName);
            draw();
          }
        }
      }
    }

    labels.forEach(function(e) { e.bringToFront(); })
    guides.forEach(function(e) { e.bringToFront(); })
  }

  paper.view.update()
  window.canvas = canvas;
  window.sb = ballStageBounds;
}

// handle mousedown events
function myDown(e) {

  // tell the browser we're handling this mouse event
  //e.preventDefault();
  //e.stopPropagation();

  // get the current mouse position
  var mx = parseInt(e.clientX - offsetX);
  var my = parseInt(e.clientY - offsetY);

  // test each shape to see if mouse is inside
  for(var i = 0; i < loadedChars.length; i++){
    var s = loadedChars[i];
    // decide if the shape is a rect or circle
    if(s.width){
      // test if the mouse is inside this rect
      if(mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height){
        // if yes, set that rects isDragging=true
        startDragging(s);
      }
    } else if (charImagesOn) {
      // s.x and s.y are in the middle of the image
      var sx_half = s.pose.imgSize[0] / 2;
      var sy_half = s.pose.imgSize[1] / 2;
      var upperLeftCornerOfImage = new Point(s.x - sx_half + s.imgOffset.x, s.y - sy_half + s.imgOffset.y);
      var charImageRect = new Rectangle(upperLeftCornerOfImage, new Size(s.pose.imgSize[0], s.pose.imgSize[1]));
      var ballRect = new Rectangle(s.x - 15, s.y - 15, 30, 30);
      var mousePoint = new Point(mx, my);
      if (ballRect.contains(mousePoint)) {
        startDragging(s, true);
      } else if (charImageRect.contains(mousePoint)) {
        startDragging(s);
      }
    } else { 
      //check for circle
      var dx = s.x - mx;
      var dy = s.y - my;
      // test if the mouse is inside this circle
      if(dx * dx + dy * dy < circleRadius * circleRadius) {
        startDragging(s);
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
  //e.preventDefault();
  //e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for(var i = 0; i < loadedChars.length; i++) {
    loadedChars[i].isDragging = false;
    loadedChars[i].isDraggingBallLocation = false;
  }
}

// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {
    // it the mouse is released outside the browser window, we can miss the mouseup event
    if(e.buttons == 0) {
      myUp(e);
      return
    }

    // tell the browser we're handling this mouse event
    //e.preventDefault();
    //e.stopPropagation();

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
        if (s.dontDragCharImage) {
          s.imgOffset.x -= dx;
          s.imgOffset.y -= dy;
        }

        if(s.x < ballStageRect.left) {
          s.imgOffset.x -= ballStageRect.left - s.x
          s.x = ballStageRect.left;
        } else if(s.x > ballStageRect.right){
          s.imgOffset.x -= ballStageRect.right - s.x
          s.x = ballStageRect.right;
        }
        if(s.y < ballStageRect.top) {
          s.imgOffset.y -= ballStageRect.top - s.y
          s.y = ballStageRect.top;
        } else if(s.y > ballStageRect.bottom){
          s.imgOffset.y -= ballStageRect.bottom - s.y
          s.y = ballStageRect.bottom;
        }
        var sx_half = s.pose.imgSize[0] / 2;
        var sy_half = s.pose.imgSize[1] / 2;
        if (s.imgOffset.x < -sx_half) {
          s.imgOffset.x = -sx_half;
        } else if (s.imgOffset.x > sx_half) {
          s.imgOffset.x = sx_half;
        }
        if (s.imgOffset.y < -sy_half) {
          s.imgOffset.y = -sy_half;
        } else if (s.imgOffset.y > sy_half) {
          s.imgOffset.y = sy_half;
        }
      }
      if (charImagesOn && s.pose.wall) {
        //just move it far out, it's gonna get snapped to the wall in the next step
        if (s.facing == 'right') {
          s.x -= trueStageRect.width;
        } else {
          s.x += trueStageRect.width;
        }
      }
      var hurtbox = s.getHurtbox()
      if(charImagesOn && !trueStageRect.contains(hurtbox)) {
        if(hurtbox.left < trueStageRect.left) {
          s.x += trueStageRect.left - hurtbox.left
        }
        if(hurtbox.right > trueStageRect.right) {
          s.x += trueStageRect.right - hurtbox.right
        }
        if(hurtbox.top < trueStageRect.top) {
          s.y += trueStageRect.top - hurtbox.top
        }
        if(hurtbox.bottom > trueStageRect.bottom) {
          s.y += trueStageRect.bottom - hurtbox.bottom
        }
      }
      var hitboxes = s.getHitboxes();
      var closestHitbox = null;
      var closestDistance = null;
      if (charImagesOn && hitboxes.length > 0) {
        for (var j = 0; j < hitboxes.length; j++) {
          var hitbox = hitboxes[j];
          var distance = new Point(0, 0);
          if (s.x < hitbox.left) {
            distance.x = s.x - hitbox.left;
          } else if (s.x > hitbox.right) {
            distance.x = s.x - hitbox.right;
          }
          if (s.y < hitbox.top) {
            distance.y = s.y - hitbox.top;
          } else if (s.y > hitbox.bottom) {
            distance.y = s.y - hitbox.bottom;
          }
          if (closestDistance == null || closestDistance.length > distance.length) {
            closestDistance = distance;
            closestHitbox = hitbox;
          }
        }
        if (closestDistance != null) {
          s.x -= closestDistance.x;
          s.y -= closestDistance.y;
          s.imgOffset.x += closestDistance.x;
          s.imgOffset.y += closestDistance.y;
        }
      }
    }

    // redraw the scene with the new rect positions
    draw();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;

  }
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

    trueStageRect = new Rectangle(new Point(0, 0), new Size(stage.canvasSize[0], stage.canvasSize[1]))
    ballStageRect = new Rectangle(new Point(ballRadius, ballRadius), new Size(stage.canvasSize[0] - ballDiameter, stage.canvasSize[1] - ballDiameter))
    ballStageBounds = new Path.Rectangle(ballStageRect)

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
    char.angles.push({ name: 'straight', degrees: 0, validWhen: ["swing", "wallswing"], maxReflections: 2})
    if (char.name == "Latch" || char.name == "Raptor") {
      char.angles[char.angles.length - 1].mirror = true;
    }
    char.angles.push({ name: 'spike', degrees: 90, validWhen: ["spike"], maxReflections: 2, customOffset: 40})
    char.showDirectButtons = true;
    char.pose = char.poses[0];
    char.facing = 'right'
    char.isDragging = false
    char.imgOffset = {x: -55, y: 0}
    char.getImage = function() {
      return "assets/characters/" + this.img_name + "_" + this.pose.name + "_r.png";
    }
    char.getHurtbox = function() {
      var box = this.pose.hurtboxes[0]
      if (this.facing == 'right') {
        return new Rectangle(new Point(this.x + this.imgOffset.x - this.pose.imgSize[0] / 2 + box[0], this.y + this.imgOffset.y - this.pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      } else {
        return new Rectangle(new Point(this.x + this.imgOffset.x - this.pose.imgSize[0] / 2 + (this.pose.imgSize[0] - box[0] - box[2]), this.y + this.imgOffset.y - this.pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      }
    }
    char.getRelativeHurtbox = function() {
      var box = this.pose.hurtboxes[0]
      if (this.facing == 'right') {
        return new Rectangle(new Point(this.imgOffset.x - this.pose.imgSize[0] / 2 + box[0], this.imgOffset.y - this.pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      } else {
        return new Rectangle(new Point(this.imgOffset.x - this.pose.imgSize[0] / 2 + (this.pose.imgSize[0] - box[0] - box[2]), this.imgOffset.y - this.pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      }
    }
    char.getHitboxes = function() {
      var calculatedHitboxes = []
      for (var i = 0; i < this.pose.hitboxes.length; i++) {
        var hitbox = this.pose.hitboxes[i];
        if (this.facing == 'right') {
          calculatedHitboxes.push(new Rectangle(new Point(this.x + this.imgOffset.x - this.pose.imgSize[0] / 2 + hitbox[0], this.y + this.imgOffset.y - this.pose.imgSize[1] / 2 + hitbox[1]), new Size(hitbox[2], hitbox[3])));
        } else {
          calculatedHitboxes.push(new Rectangle(new Point(this.x + this.imgOffset.x + this.pose.imgSize[0] / 2 - hitbox[0] - hitbox[2], this.y + this.imgOffset.y - this.pose.imgSize[1] / 2 + hitbox[1]), new Size(hitbox[2], hitbox[3])));
        }
      }
      return calculatedHitboxes;
    }
    for (var j = 0; j < char.poses.length; j++) {
      var pose = char.poses[j];
      for (var k = 0; k < char.angles.length; k++) {
        var angle = char.angles[k];
        if (angle.validWhen.indexOf(pose.name) >= 0) {
          pose.canParry = true;
          break;
        }
      }
    }
    characters.push(char)

    $('#menu ul').append('<li id='+char.name+'><span class="character">'+char.name+'</span> <span class="turn">&#8634;</span><ol class="angles hidden"></ol></li>')
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
        if(char.name == 'Candyman') {
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
      unloadChar(charName);
    }

    draw()
  })

  /** turn around */
  $('.turn').on('click', function(e) {
    var charName = $(e.target).parent().attr('id')
    var char = loadedChars.find(function(e){ return e.name == charName })
    if(!char) char = characters.find(function(e){ return e.name == charName })
    flipDirectionFacing(char);

    draw()
  })

  /** toggle angles */
  $('.angles li').on('click', function(e) {
    var classes = $(e.target).attr('class').split(/\s+/)
    var charName = classes[0]
    var angleName = classes[1]

    var char = loadChar(charName)

    var angle = char.angles.find(function(e){ return e.name == angleName })
    if(angle.visible) {
      angle.visible = false
    } else {
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
    if(sign == 'plus') {
      addReflectionsToAngle(charName, angleName, 1);
    } else {
      addReflectionsToAngle(charName, angleName, -1);
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
    addCandySpecialToAngle(charName, angleName);

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

$('#charImages').on('click', function(e) {
  e.preventDefault
  charImagesOn = !charImagesOn
  draw()
})

$('#ballImpacts').on('click', function(e) {
  e.preventDefault
  showBallImpactLocations = !showBallImpactLocations
  draw()
})

$('#collision').on('click', function(e) {
  e.preventDefault
  ignoreHitboxCollisions = !ignoreHitboxCollisions
  draw()
})

$('#clear').on('click', function(e) {
  paper.project.activeLayer.removeChildren()
  loadedChars = []
  characters.forEach(function(e) {
    e.angles.forEach(function(e) { e.visible = false; e.reflections = 0; })
  })
})
