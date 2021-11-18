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
    "baseHeight": 138,
    "poses": [
      {
        "name": "swing",
        "imgSize": [215, 158],
        "hurtboxes": [[55, 14, 60, 138]],
        "hitboxes": [[85, 14, 124, 138]]
      },
      {
        "name": "smash",
        "imgSize": [213, 240],
        "hurtboxes": [[59, 93, 60, 138]],
        "hitboxes": [[34, 24, 110, 100], [89, 93, 110, 138]]
      },
      {
        "name": "spike",
        "imgSize": [165, 278],
        "hurtboxes": [[53, 23, 60, 138]],
        "hitboxes": [[22, 102, 121, 170]]
      },
      {
        "name": "bunt",
        "imgSize": [217, 209],
        "hurtboxes": [[64, 60, 60, 138]],
        "hitboxes": [[127, 20, 77, 75], [94, 95, 110, 103]]
      },
      {
        "name": "grab",
        "imgSize": [214, 165],
        "hurtboxes": [[64, 18, 60, 138]],
        "hitboxes": [[94, 18, 110, 138]],
        "canMirror": true,
        "fixedRelease": [110, 49],
      },
      {
        "name": "stand",
        "imgSize": [131, 158],
        "hurtboxes": [[15, 12, 60, 138]],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [145, 127],
        "hurtboxes": [[42, 23, 60, 96]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [179, 111],
        "hurtboxes": [[53, 36, 80, 64]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [179, 72],
        "hurtboxes": [[23, 7, 138, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 7,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 190, 60, 138]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
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
        "validWhen": ["smash"],
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
        "validWhen": ["spike"],
        "customOffset": 70,
      },
      {
        "name": "spike-backward",
        "degrees": 106,
        "validWhen": ["spike"]
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
      },
      {
        "name": "spit",
        "imgSize": [209, 151],
        "hurtboxes":[[76, 1, 80, 136]],
        "hitboxes":[],
        "canMirror": true,
        "fixedRelease": [65, 53],
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
        "canMirror": true,
        "fixedRelease": [120, 68],
      },
      {
        "name": "stand",
        "imgSize": [150, 149],
        "hurtboxes":[[46, 0, 80, 136]],
        "hitboxes":[],
      },
      {
        "name": "halfcrouch",
        "imgSize": [169, 120],
        "hurtboxes":[[39, 0, 80, 96]],
        "hitboxes":[],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [155, 82],
        "hurtboxes":[[26, 5, 80, 60]],
        "hitboxes":[],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [196, 69],
        "hurtboxes":[[28, 1, 136, 45]],
        "hitboxes":[],
        "grounded": true,
        "groundOffset": 6,
      },
      {
        "name": "blaze",
        "imgSize": [400, 346],
        "hurtboxes": [[160, 192, 80, 136]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -38,
        "validWhen": ["swing", "wallswing", "spit"],
        "mirror": true,
      },
      {
        "name": "ground-down",
        "degrees": 28,
        "validWhen": ["swing", "spit"],
        "mirror": true,
      },
      {
        "name": "smash",
        "degrees": 38,
        "validWhen": ["smash", "swing", "spit"], //currently this angle gets combined with the next angle
        "mirror": true,
        "customOffset": 110,
      },
      {
        "name": "air-down",
        "degrees": 38,
        "validWhen": ["swing", "spit"],
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
        "validWhen": ["swing", "spit"],
        "mirror": true,
        "customOffset": 110,
      }
    ]
  },
  "Raptor": {
    "color": "red",
    "strokeColor": "purple",
    "img_name": "raptor",
    "baseHeight": 126,
    "poses": [
      {
        "name": "swing",
        "imgSize": [165, 128],
        "hurtboxes": [[16, 0, 60, 126]],
        "hitboxes": [[41, 0, 124, 126]],
        "canMirror": true,
      },
      {
        "name": "smash",
        "imgSize": [213, 201],
        "hurtboxes": [[64, 72, 60, 126]],
        "hitboxes": [[39, 0, 110, 72], [89, 72, 124, 126]],
        "canMirror": true,
      },
      {
        "name": "spike",
        "imgSize": [122, 245],
        "hurtboxes": [[31, 2, 60, 126]],
        "hitboxes": [[0, 75, 122, 170]],
        "canMirror": true,
      },
      {
        "name": "bunt",
        "imgSize": [159, 177],
        "hurtboxes": [[10, 40, 60, 126]],
        "hitboxes": [[70, 0, 89, 72]],
      },
      {
        "name": "grab",
        "imgSize": [191, 130],
        "hurtboxes": [[42, 0, 60, 126]],
        "hitboxes": [[67, 0, 124, 126]],
        "canMirror": true,
        "fixedRelease": [110, 43],
      },
      {
        "name": "stand",
        "imgSize": [84, 136],
        "hurtboxes": [[12, 5, 60, 126]],
        "hitboxes": [],
      },
      {
        "name": "halfcrouch",
        "imgSize": [111, 100],
        "hurtboxes": [[0, 2, 60, 96]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [131, 89],
        "hurtboxes": [[0, 18, 80, 64]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [184, 54],
        "hurtboxes": [[58, 0, 126, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 1,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 202, 60, 126]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": ["swing", "smash"],
        "mirror": true,
      },
      {
        "name": "ground-down",
        "degrees": 30,
        "validWhen": ["swing"],
        "mirror": true,
      },
      {
        "name": "smash",
        "degrees": 42,
        "validWhen": ["smash", "swing"], //currently this angle gets combined with the next angle
        "mirror": true,
      },
      {
        "name": "air-down",
        "degrees": 42,
        "validWhen": ["swing"],
        "mirror": true,
      },
      {
        "name": "spike-forward",
        "degrees": 83,
        "validWhen": ["spike"]
      },
      {
        "name": "spike-backward",
        "degrees": 97,
        "validWhen": ["spike"]
      }
    ]
  },
  "Jet": {
    "color": "lightskyblue",
    "strokeColor": "royalblue",
    "img_name": "jet",
    "baseHeight": 148,
    "maxBubbleDistance": 230,
    "poses": [
      {
        "name": "swing",
        "imgSize": [158, 157],
        "hurtboxes": [[6, 4, 60, 148]],
        "hitboxes": [[31, 4, 124, 148]]
      },
      {
        "name": "smash",
        "imgSize": [196, 217],
        "hurtboxes": [[46, 67, 60, 148]],
        "hitboxes": [[21, 3, 110, 64], [71, 67, 124, 148]]
      },
      {
        "name": "spike",
        "imgSize": [128, 257],
        "hurtboxes": [[33, 1, 60, 148]],
        "hitboxes": [[2, 85, 121, 170]]
      },
      {
        "name": "bunt",
        "imgSize": [173, 197],
        "hurtboxes": [[21, 43, 60, 148]],
        "hitboxes": [[81, 3, 89, 74], [46, 77, 124, 114]]
      },
      {
        "name": "grab",
        "imgSize": [171, 154],
        "hurtboxes": [[18, 2, 60, 148]],
        "hitboxes": [[43, 2, 124, 148]],
        "canMirror": true,
        "fixedRelease": [110, 74],
      },
      {
        "name": "stand",
        "imgSize": [86, 159],
        "hurtboxes": [[15, 6, 60, 148]],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [132, 117],
        "hurtboxes": [[27, 4, 60, 104]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [131, 99],
        "hurtboxes": [[17, 17, 80, 70]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [174, 76],
        "hurtboxes": [[10, 6, 148, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 12,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 180, 60, 148]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -60,
        "validWhen": ["swing"],
      },
      {
        "name": "ground-down",
        "degrees": 17,
        "validWhen": ["swing"],
      },
      {
        "name": "smash",
        "degrees": 35, //currently this angle gets combined with the next angle
        "validWhen": ["smash", "swing"],
      },
      {
        "name": "air-down",
        "degrees": 35,
        "validWhen": ["swing"],
      },
      {
        "name": "spike-forward",
        "degrees": 80,
        "validWhen": ["spike"],
      },
      {
        "name": "spike-backward",
        "degrees": 100,
        "validWhen": ["spike"],
      }
    ]
  },
  "Nitro": {
    "color": "white",
    "strokeColor": "black",
    "img_name": "nitro",
    "baseHeight": 148,
    "poses": [
      {
        "name": "swing",
        "imgSize": [225, 163],
        "hurtboxes": [[66, 8, 65, 148]],
        "hitboxes": [[94, 8, 125, 150]]
      },
      {
        "name": "smash",
        "imgSize": [226, 224],
        "hurtboxes": [[73, 65, 65, 148]],
        "hitboxes": [[51, 1, 110, 64], [101, 65, 124, 148]]
      },
      {
        "name": "spike",
        "imgSize": [128, 258],
        "hurtboxes": [[31, 2, 65, 148]],
        "hitboxes": [[3, 86, 121, 170]]
      },
      {
        "name": "bunt",
        "imgSize": [227, 196],
        "hurtboxes": [[53, 42, 65, 148]],
        "hitboxes": [[119, 2, 86, 76], [81, 79, 124, 111]]
      },
      {
        "name": "grab",
        "imgSize": [204, 156],
        "hurtboxes": [[48, 3, 65, 148]],
        "hitboxes": [[76, 3, 124, 148]],
        "canMirror": true,
        "fixedRelease": [102, 48], //TODO: verify that this is REALLY correct
      },
      {
        "name": "stand",
        "imgSize": [121, 173],
        "hurtboxes": [[38, 16, 65, 148]],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [126, 124],
        "hurtboxes": [[46, 2, 66, 114]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [110, 103],
        "hurtboxes": [[28, 7, 80, 90]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [204, 73],
        "hurtboxes": [[46, 1, 148, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 12,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[167.5, 180, 65, 148]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -20,
        "validWhen": ["swing", "smash"]
      },
      {
        "name": "ground-down",
        "degrees": 62,
        "validWhen": ["swing", "smash"] //currently this angle gets combined with the next angle
      },
      {
        "name": "air-down",
        "degrees": 62,
        "validWhen": ["swing"]
      },
      {
        "name": "special-down",
        "degrees": 20, //TODO: find out correct angle
        "validWhen": ["swing", "smash"]
      },
      {
        "name": "smash",
        "degrees": 41,
        "validWhen": ["smash"]
      },
      {
        "name": "spike-forward",
        "degrees": 83,
        "validWhen": ["spike"]
      },
      {
        "name": "spike-backward",
        "degrees": 180,
        "validWhen": ["spike"],
        "maxReflections": 2,
      }
    ]
  },
  "Doombox": {
    "color": "#444",
    "strokeColor": "royalblue",
    "img_name": "db",
    "baseHeight": 170,
    "specialAngle": 15,
    "poses": [
      {
        "name": "swing",
        "imgSize": [341, 233],
        "hurtboxes":[[118, 55, 100, 170]],
        "hitboxes":[[170, 55, 170, 170]],
        "canSpecial": true,
      },
      {
        "name": "smash",
        "imgSize": [322, 295],
        "hurtboxes":[[98, 122, 100, 170]],
        "hitboxes":[[98, 2, 120, 120], [150, 122, 170, 170]],
        "canSpecial": true,
      },
      {
        "name": "spike",
        "imgSize": [166, 310],
        "hurtboxes":[[24, 41, 100, 170]],
        "hitboxes":[[14, 137, 120, 170]],
        "canSpecial": true,
      },
      {
        "name": "bunt",
        "imgSize": [308, 236],
        "hurtboxes":[[83, 58, 100, 170]],
        "hitboxes":[[185, 18, 120, 82], [135, 100, 170, 128]],
      },
      {
        "name": "grab",
        "imgSize": [327, 227],
        "hurtboxes":[[88, 50, 100, 170]],
        "hitboxes":[[140, 50, 170, 170]],
        "canMirror": true,
        "fixedRelease": [130, 85],
      },
      {
        "name": "stand",
        "imgSize": [231, 241],
        "hurtboxes":[[51, 51, 100, 170]],
        "hitboxes":[],
      },
      {
        "name": "halfcrouch",
        "imgSize": [197, 179],
        "hurtboxes":[[45, 74, 100, 84]],
        "hitboxes":[],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [105, 113],
        "hurtboxes":[[4, 47, 100, 60]],
        "hitboxes":[],
        "grounded": true,
        "groundOffset": -7,
      },
      {
        "name": "pushbox",
        "imgSize": [332, 117],
        "hurtboxes":[[9, 51, 100, 60]],
        "hitboxes":[[29, 4, 300, 110]],
        "grounded": true,
        "groundOffset": -7,
      },
      {
        "name": "lay",
        "imgSize": [290, 121],
        "hurtboxes":[[64, 21, 170, 45]],
        "hitboxes":[],
        "grounded": true,
        "groundOffset": 22,
      },
      {
        "name": "blaze",
        "imgSize": [400, 329],
        "hurtboxes": [[150, 158, 100, 170]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
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
        "validWhen": ["smash"],
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
        "validWhen": ["spike"],
        "customOffset": 110,
      },
      {
        "name": "spike-backward",
        "degrees": 160,
        "validWhen": ["spike"]
      }
    ]
  },
  "Grid": {
    "color": "yellow",
    "strokeColor": "mediumpurple",
    "img_name": "grid",
    "baseHeight": 160,
    "teleportDistance": 330,
    "maxTeleports": 2,
    "teleport": [],
    "poses": [
      {
        "name": "swing",
        "imgSize": [217, 166],
        "hurtboxes": [[62, 0, 70, 160]],
        "hitboxes": [[87, 0, 130, 160]],
        "teleportRelease": [122, 80],
        "teleportAngle": {
          "name": "straight",
          "degrees": 0,
          "maxReflections": 2,
        },
        "teleportImage": "swing_teleport",
      },
      {
        "name": "smash",
        "imgSize": [222, 252],
        "hurtboxes": [[67, 92, 70, 160]],
        "hitboxes": [[47, 0, 110, 90],[92, 92, 130, 160]],
        "teleportRelease": [62, -93],
        "teleportAngle": {
          "name": "smash",
          "degrees": 28,
        },
      },
      {
        "name": "spike",
        "imgSize": [122, 260],
        "hurtboxes": [[26, 0, 70, 160]],
        "hitboxes": [[1, 90, 120, 170]],
        "teleportRelease": [35, 118],
        "teleportAngle": {
          "name": "spike",
          "degrees": 90,
          "maxReflections": 2,
        },
      },
      {
        "name": "bunt",
        "imgSize": [201, 210],
        "hurtboxes": [[46, 40, 70, 160]],
        "hitboxes": [[116, 0, 85, 80],[71, 80, 130, 120]],
      },
      {
        "name": "grab",
        "imgSize": [232, 169],
        "hurtboxes": [[66, 2, 70, 160]],
        "hitboxes": [[91, 2, 130, 160]],
        "canMirror": true,
        "fixedRelease": [115, 80],
      },
      {
        "name": "stand",
        "imgSize": [163, 191],
        "hurtboxes": [[20, 7, 70, 160]],
        "hitboxes": [],
      },
      {
        "name": "halfcrouch",
        "imgSize": [149, 162],
        "hurtboxes": [[27, 46, 70, 89]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [139, 148],
        "hurtboxes": [[25, 33, 70, 89]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [210, 89],
        "hurtboxes": [[6, 1, 160, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 18,
      },
      {
        "name": "blaze",
        "imgSize": [400, 353],
        "hurtboxes": [[165, 168, 70, 160]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -50,
        "validWhen": ["swing"],
      },
      {
        "name": "ground-down",
        "degrees": 50,
        "validWhen": ["swing"],
      },
      {
        "name": "smash",
        "degrees": 28,
        "validWhen": ["smash"],
        "customOffset": 110,
      },
      {
        "name": "air-down",
        "degrees": 15,
        "validWhen": ["swing"],
      },
      {
        "name": "spike-forward",
        "degrees": 32,
        "validWhen": ["spike"],
        "customOffset": 70,
      },
      {
        "name": "spike-backward",
        "degrees": 117,
        "validWhen": ["spike"],
      }
    ]
  },
  "Switch": {
    "color": "slategrey",
    "strokeColor": "navy",
    "img_name": "switch",
    "baseHeight": 146,
    "poses": [
      {
        "name": "swing",
        "imgSize": [234, 160],
        "hurtboxes": [[80, 2, 60, 146]],
        "hitboxes": [[105, 2, 124, 146]],
      },
      {
        "name": "smash",
        "imgSize": [203, 215],
        "hurtboxes": [[53, 65, 60, 146]],
        "hitboxes": [[28, 3, 110, 62], [78, 65, 124, 146]],
        "canMirror": true,
      },
      {
        "name": "spike",
        "imgSize": [135, 263],
        "hurtboxes": [[37, 7, 60, 146]],
        "hitboxes": [[6, 90, 121, 170]],
        "canMirror": true,
      },
      {
        "name": "switchflip",
        "imgSize": [190, 216],
        "hurtboxes": [[57, 28, 60, 146]],
        "hitboxes": [[12, 83, 150, 130]],
        "canMirror": true,
      },
      {
        "name": "overheadswitchflip",
        "imgSize": [178, 245],
        "hurtboxes": [[52, 97, 60, 146]],
        "hitboxes": [[7, 5, 150, 130]],
        "canMirror": true,
      },
      {
        "name": "bunt",
        "imgSize": [195, 220],
        "hurtboxes": [[32, 67, 60, 146]],
        "hitboxes": [[92, 28, 89, 76], [57, 104, 124, 109]],
      },
      {
        "name": "grab",
        "imgSize": [187, 176],
        "hurtboxes": [[33, 23, 60, 146]],
        "hitboxes": [[58, 23, 124, 146]],
        "canMirror": true,
        "fixedRelease": [110, 73],
      },
      {
        "name": "stand",
        "imgSize": [120, 160],
        "hurtboxes": [[23, 6, 60, 146]],
        "hitboxes": [],
      },
      {
        "name": "halfcrouch",
        "imgSize": [149, 123],
        "hurtboxes": [[46, 9, 60, 104]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [156, 92],
        "hurtboxes": [[35, 13, 80, 70]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [182, 78],
        "hurtboxes": [[25, 8, 146, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 10,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 182, 60, 146]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
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
        "validWhen": ["swing", "switchflip", "overheadswitchflip", "smash"], //currently this angle gets combined with the next angle
        "mirror": true,
      },
      {
        "name": "special",
        "degrees": 17,
        "validWhen": ["switchflip", "overheadswitchflip"],
        "mirror": true,
      },
      {
        "name": "smash",
        "degrees": 38,
        "validWhen": ["smash"]
      },
      {
        "name": "air-down",
        "degrees": 38,
        "validWhen": ["swing"]
      },
      {
        "name": "spike-forward",
        "degrees": 71,
        "validWhen": ["spike"]
      },
      {
        "name": "spike-backward",
        "degrees": 109,
        "validWhen": ["spike"]
      }
    ]
  },
  "Candyman": {
    "color": "gold",
    "strokeColor": "brown",
    "img_name": "candy",
    "baseHeight": 152,
    "poses": [
      {
        "name": "swing",
        "imgSize": [203, 162],
        "hurtboxes": [[49, 6, 60, 152]],
        "hitboxes": [[74, 6, 124, 152]]
      },
      {
        "name": "smash",
        "imgSize": [192, 229],
        "hurtboxes": [[44, 73, 60, 152]],
        "hitboxes": [[19, 3, 110, 70], [69, 73, 124, 152]]
      },
      {
        "name": "spike",
        "imgSize": [150, 264],
        "hurtboxes": [[51, 5, 60, 152]],
        "hitboxes": [[20, 91, 121, 170]]
      },
      {
        "name": "bunt",
        "imgSize": [224, 201],
        "hurtboxes": [[71, 44, 60, 152]],
        "hitboxes": [[131, 4, 90, 78], [95, 82, 126, 114]]
      },
      {
        "name": "grab",
        "imgSize": [178, 164],
        "hurtboxes": [[27, 3, 60, 152]],
        "hitboxes": [[52, 3, 124, 152]],
        "canMirror": true,
        "fixedRelease": [110, 76],
      },
      {
        "name": "stand",
        "imgSize": [100, 171],
        "hurtboxes": [[25, 11, 60, 152]],
        "hitboxes": [],
      },
      {
        "name": "halfcrouch",
        "imgSize": [157, 119],
        "hurtboxes": [[42, 1, 60, 110]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [162, 92],
        "hurtboxes": [[35, 4, 80, 74]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [167, 100],
        "hurtboxes": [[6, 32, 152, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 14,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 176, 60, 152]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -25,
        "validWhen": ["swing", "smash"]
      },
      {
        "name": "ground-down",
        "degrees": 55,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 70,
        "validWhen": ["smash"],
        "customOffset": 90,
      },
      {
        "name": "air-down",
        "degrees": 8,
        "validWhen": ["swing", "smash"],
        "customOffset": 110,
      },
      {
        "name": "spike-forward",
        "degrees": 25,
        "validWhen": ["spike"]
      },
      {
        "name": "spike-backward",
        "degrees": -105,
        "validWhen": ["spike"]
      }
    ]
  },
  "Sonata": {
    "color": "#3349cb",
    "strokeColor": "darkviolet",
    "img_name": "sonata",
    "baseHeight": 140,
    "poses": [
      {
        "name": "swing",
        "imgSize": [209, 150],
        "hurtboxes": [[55, 3, 60, 140]],
        "hitboxes": [[80, 3, 124, 140]],
      },
      {
        "name": "smash",
        "imgSize": [232, 227],
        "hurtboxes": [[77, 79, 60, 140]],
        "hitboxes": [[52, 11, 110, 68], [102, 79, 124, 140]],
      },
      {
        "name": "spike",
        "imgSize": [147, 279],
        "hurtboxes": [[34, 27, 60, 140]],
        "hitboxes": [[4, 107, 121, 170]],
      },
      {
        "name": "bunt",
        "imgSize": [206, 191],
        "hurtboxes": [[53, 43, 60, 140]],
        "hitboxes": [[113, 3, 89, 74], [78, 77, 124, 106]]
      },
      {
        "name": "grab",
        "imgSize": [226, 189],
        "hurtboxes": [[69, 41, 60, 140]],
        "hitboxes": [[94, 41, 124, 140]],
        "canMirror": true,
        "fixedRelease": [110, 70],
      },
      {
        "name": "stand",
        "imgSize": [152, 188],
        "hurtboxes": [[11, 40, 60, 140]],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [199, 144],
        "hurtboxes": [[52, 28, 60, 104]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [187, 107],
        "hurtboxes": [[34, 29, 80, 70]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [221, 74],
        "hurtboxes": [[52, 3, 140, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 8,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 188, 60, 140]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
    ],
    "angles": [
      {
        "name": "up",
        "degrees": -20,
        "validWhen": ["swing"]
      },
      {
        "name": "smash",
        "degrees": 55, //currently this angle gets combined with the next angle
        "validWhen": ["swing", "smash", "spike"]
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
        "validWhen": ["spike"]
      },
      {
        "name": "special-up",
        "degrees": -45, // TODO: verify sonata special angles
        "validWhen": ["swing", "smash", "spike"]
      },
      {
        "name": "special-down",
        "degrees": 45,
        "validWhen": ["swing", "smash", "spike"]
      },
      {
        "name": "spike-backward",
        "degrees": -165,
        "validWhen": ["spike"]
      },
      {
        "name": "bring-it",
        "degrees": 90,
        "validWhen": [],
        "hidden": true,
      },
      {
        "name": "nice",
        "degrees": -90,
        "validWhen": [],
        "hidden": true,
      }
    ]
  },
  "Dice": {
    "color": "saddlebrown",
    "strokeColor": "#c8de0a",
    "img_name": "dice",
    "baseHeight": 148,
    "poses": [
      {
        "name": "swing",
        "imgSize": [190, 166],
        "hurtboxes": [[36, 9, 60, 148]],
        "hitboxes": [[61, 9, 124, 148]]
      },
      {
        "name": "smash",
        "imgSize": [200, 215],
        "hurtboxes": [[50, 66, 60, 148]],
        "hitboxes": [[25, 2, 110, 64], [75, 66, 124, 148]]
      },
      {
        "name": "spike",
        "imgSize": [187, 264],
        "hurtboxes": [[58, 4, 60, 148]],
        "hitboxes": [[28, 88, 120, 170]]
      },
      {
        "name": "bunt",
        "imgSize": [187, 199],
        "hurtboxes": [[34, 45, 60, 148]],
        "hitboxes": [[94, 5, 89, 77], [59, 82, 124, 111]]
      },
      {
        "name": "grab",
        "imgSize": [194, 160],
        "hurtboxes": [[43, 7, 60, 148]],
        "hitboxes": [[68, 7, 124, 148]],
        "canMirror": true,
        "fixedRelease": [110, 74],
      },
      {
        "name": "stand",
        "imgSize": [77, 162],
        "hurtboxes": [[5, 8, 60, 148]],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [82, 124],
        "hurtboxes": [[4, 3, 60, 110]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [105, 104],
        "hurtboxes": [[9, 23, 80, 74]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [171, 72],
        "hurtboxes": [[8, 2, 148, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 12,
      },
      {
        "name": "blaze",
        "imgSize": [400, 400],
        "hurtboxes": [[170, 180, 60, 148]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
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
        "validWhen": ["smash"]
      },
      {
        "name": "spike-forward",
        "degrees": 80,
        "validWhen": ["spike"]
      },
      {
        "name": "spike-backward",
        "degrees": 110,
        "validWhen": ["spike"]
      },
      {
        "name": "spin",
        "degrees": 315 - 360,
        "validWhen": ["swing", "smash", "spike"],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 4.2,
        "maxReflections": 1,
        "hidden": true,
        "customOffset": 125,
      },
      {
        "name": "spin-up",
        "degrees": 275,
        "validWhen": ["swing", "smash", "spike"],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 5.25,
        "maxReflections": 1,
        "hidden": true,
        "customOffset": 125,
      },
      {
        "name": "spin-down",
        "degrees": 0,
        "validWhen": ["swing", "smash", "spike"],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 4,
        "maxReflections": 1,
        "hidden": true,
        "customOffset": 125,
      },
      {
        "name": "spin-back",
        "degrees": 260,
        "validWhen": ["swing", "smash", "spike"],
        "pong": true,
        "initialSpeed": 34,
        "pongStep": 2,
        "turnRate": 6,
        "maxReflections": 1,
        "hidden": true,
        "customOffset": 125,
      },
    ]
  },
  "DustAndAshes": {
    "color": "#5d68b3",
    "strokeColor": "#23da7d",
    "img_name": "dust",
    "baseHeight": 142,
    "poses": [
      {
        "name": "swing",
        "imgSize": [243, 150],
        "hurtboxes": [[85, 2, 60, 142]],
        "hitboxes": [[115, 2, 124, 142]]
      },
      {
        "name": "smash",
        "imgSize": [256, 250],
        "hurtboxes": [[100, 92, 60, 142]],
        "hitboxes": [[75, 7, 110, 85], [130, 92, 124, 142]]
      },
      {
        "name": "spike",
        "imgSize": [145, 256],
        "hurtboxes": [[42, 2, 60, 142]],
        "hitboxes": [[12, 83, 120, 170]]
      },
      {
        "name": "bunt",
        "imgSize": [175, 198],
        "hurtboxes": [[29, 47, 60, 142]],
        "hitboxes": [[89, 7, 80, 75], [59, 82, 110, 107]]
      },
      {
        "name": "grab",
        "imgSize": [192, 162],
        "hurtboxes": [[42, 11, 60, 142]],
        "hitboxes": [[72, 11, 110, 142]],
        "canMirror": true,
        "fixedRelease": [110, 51],
      },
      {
        "name": "stand",
        "imgSize": [92, 158],
        "hurtboxes": [[9, 4, 60, 142]],
        "hitboxes": []
      },
      {
        "name": "halfcrouch",
        "imgSize": [145, 124],
        "hurtboxes": [[33, 4, 60, 96]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "crouch",
        "imgSize": [158, 88],
        "hurtboxes": [[28, 2, 80, 64]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 0,
      },
      {
        "name": "lay",
        "imgSize": [167, 72],
        "hurtboxes": [[8, 2, 142, 45]],
        "hitboxes": [],
        "grounded": true,
        "groundOffset": 8,
      },
      {
        "name": "blaze",
        "imgSize": [400, 352],
        "hurtboxes": [[170, 186, 60, 142]],
        "hitboxes": [[0, 0, 400, 400]],
        "circle": true,
        "grounded": true,
        "groundOffset": 0,
      },
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
        "validWhen": ["smash"],
        "customOffset": 100,
      },
      {
        "name": "spike-forward",
        "degrees": 44,
        "validWhen": ["spike"],
        "customOffset": 100,
      },
      {
        "name": "spike-backward",
        "degrees": 163,
        "validWhen": ["spike"],
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
var tooltipOffset = new Point(-10, -17);
var tooltipLocation = new Point();
var tooltipText = '';

window.onresize = function() {
  offsetX = canvas.getBoundingClientRect().left;
  offsetY = canvas.getBoundingClientRect().top;
}

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

document.documentElement.addEventListener('mouseup', myUp);

var stages = [], characters = [], loadedChars = []
var activeEntities = [];

function loadChar(charName) {
  var char = loadedChars.find(function(e){ return e.name == charName });
  if (!char) {
    char = characters.find(function(e){ return e.name == charName });
    loadedChars.push(char);
    activeEntities.push(char);
    $('li#' + charName + ' ol').removeClass("hidden");
    $('#' + char.name).css('background-image', 'url("assets/characters/' + char.img_name + '_icon2.png")');
  }

  return char;
}

function unloadChar(charName) {
  var i = loadedChars.findIndex(function(e){ return e.name == charName });
  if (i >= 0) {
    var char = characters.find(function(e){ return e.name == charName });
    loadedChars.splice(i, 1);
    var j = activeEntities.findIndex(function(e){ return e.name == charName });
    activeEntities.splice(j, 1);
    $('li#' + charName + ' ol').addClass("hidden");
    $('#' + char.name).css('background-image', 'url("assets/characters/' + char.img_name + '_icon.png")');
    if(char.spray) {
      removeToxicSpray(char);
    }
  }
}

function addGeneralAngles(char) {
  if(char.name == "Sonata"){
    char.angles.push({ name: 'straight', degrees: 0, validWhen: ["swing", "smash", "spike"], maxReflections: 2});
  }else if(char.name == "Candyman" || char.name == "Nitro" || char.name == "Raptor"){
    char.angles.push({ name: 'straight', degrees: 0, validWhen: ["swing", "smash"], maxReflections: 2});
  }else{
    char.angles.push({ name: 'straight', degrees: 0, validWhen: ["swing", "wallswing", "spit", "pushbox"], maxReflections: 2});
  }
  if (char.name == "Latch" || char.name == "Raptor" || char.name == "Sonata") {
    char.angles[char.angles.length - 1].mirror = true;
  }
  char.angles.push({ name: 'spike', degrees: 90, validWhen: ["spike"], maxReflections: 2, customOffset: 40});
  char.angles.push({ name: 'straight-throw', degrees: 0, validWhen: ["grab"], maxReflections: 2, mirror: true, customOffset: 45, hidden: true});
  char.angles.push({ name: 'down-throw', degrees: 90, validWhen: ["grab"], maxReflections: 2, mirror: true, customOffset: 45, hidden: true});
  var validBuntPoses = ["bunt"];
  if (char.name == "Raptor"){
    validBuntPoses = ["bunt", "swing", "smash"]
  }
  char.angles.push(
    {
      "name": "bunt",
      "degrees": -90,
      "validWhen": validBuntPoses,
      "bunt": true,
      "initialSpeed": 16 * 0.6,
      "gravity": 18,
      "maxGravity": 15,
      "buntStep": 100,
      "maxReflections": 1,
      "hidden": true,
      "customOffset": 120,
    });
  char.angles.push(
    {
      "name": "bunt-down",
      "degrees": 90,
      "validWhen": validBuntPoses,
      "bunt": true,
      "initialSpeed": 16 * 0.6,
      "gravity": 18,
      "maxGravity": 15,
      "buntStep": 50,
      "maxReflections": 1,
      "hidden": true,
      "customOffset": 120,
    });
  char.angles.push(
    {
      "name": "bunt-forward",
      "degrees": -65,
      "validWhen": validBuntPoses,
      "bunt": true,
      "initialSpeed": 16 * 0.6,
      "gravity": 18,
      "maxGravity": 15,
      "buntStep": 10,
      "maxReflections": 1,
      "hidden": true,
      "customOffset": 120,
    });
  char.angles.push(
    {
      "name": "bunt-backward",
      "degrees": -115,
      "validWhen": validBuntPoses,
      "bunt": true,
      "initialSpeed": 16 * 0.6,
      "gravity": 18,
      "maxGravity": 15,
      "buntStep": 10,
      "maxReflections": 1,
      "hidden": true,
      "customOffset": 120,
    });
}

function toggleToxicSpray(char) {
  if (char.spray) {
    removeToxicSpray(char);
  } else {
    addToxicSpray(char);
  }
}

function addToxicSpray(char) {
  var posx = char.x + 150;
  var posy = char.y - 20;
  if (char.facing == "left") {
    posx = char.x - 150;
  }
  var spray = {
    x: posx,
    y: posy,
    imageName: "toxic_spray",
    imageScale: 1,
    imgSize: [230, 112],
    hitbox: [43, 22, 150, 78],
    hurtbox: [43+35, 22+9, 150-35*2, 78-9*2],
    width: 200,
    height: 96,
    pose: {},
    isDragging: false,
    imgOffset: {x: 0, y: 0},
    isCharacter: false,
    stickToBoundaries: true,
    ignoreHurtboxCollisions: true,
  };
  spray.getHurtbox = function() {
    return new Rectangle(new Point(this.x - this.imgSize[0] / 2 + this.hurtbox[0], this.y - this.imgSize[1] / 2 + this.hurtbox[1]), new Size(this.hurtbox[2], this.hurtbox[3]));
  };
  spray.getHitboxes = function() {
    return [new Rectangle(new Point(this.x - this.imgSize[0] / 2 + this.hitbox[0], this.y - this.imgSize[1] / 2 + this.hitbox[1]), new Size(this.hitbox[2], this.hitbox[3]))];
  }
  char.spray = spray;
  activeEntities.push(spray);
}

function removeToxicSpray(char) {
  var index = activeEntities.indexOf(char.spray);
  if (index > -1) {
    activeEntities.splice(index, 1);
    char.spray = null;
  }
}

function toggleDoomboxAimReticle(char) {
  if (char.reticle) {
    removeDoomboxAimReticle(char);
  } else {
    addDoomboxAimReticle(char);
  }
}

function addDoomboxAimReticle(char) {
  var posx = char.x + 150;
  var posy = char.y - 20;
  if (char.facing == "left") {
    posx = char.x - 150;
  }
  for (var i = 0; i < loadedChars.length; i++) {
    var otherChar = loadedChars[i];
    if (otherChar != char) {
      var hurtbox = otherChar.getHurtbox();
      posx = hurtbox.center.x;
      posy = hurtbox.center.y;
      break;
    }
  }
  var reticle = {
    x: posx,
    y: posy,
    imageName: "db_icon",
    imageScale: 0.5,
    width: 75,
    height: 75,
    isDragging: false,
    imgOffset: {x: 0, y: 0},
    isCharacter: false,
    ignoreHitboxCollisions: true,
    ignoreHurtboxCollisions: true,
  };
  reticle.angles = [
    {
      "name": "snipe",
      "snipeMultiplier": 0,
      "customOffset": 125,
      "visible": true,
      "reflections": 0,
    },
    {
      "name": "up-snipe",
      "snipeMultiplier": 1,
      "customOffset": 125,
    },
    {
      "name": "down-snipe",
      "snipeMultiplier": -1,
      "customOffset": 125,
    },
  ];
  char.reticle = reticle;
  activeEntities.push(reticle);
}

function removeDoomboxAimReticle(char) {
  var index = activeEntities.indexOf(char.reticle);
  if (index > -1) {
    activeEntities.splice(index, 1);
    char.reticle = null;
  }
}

function getAngleLabelText(angle) {
  var content = Array.isArray(angle.labels) ? angle.labels.join(' / ') : angle.name;
  return content.toUpperCase();
}


function addReflectionsToAngleByName(charName, angleName, amount) {
  var char = loadChar(charName);
  var angle = char.angles.find(function(e){ return e.name == angleName })
  addReflectionsToAngle(char, angle, amount, true);
}

function addReflectionsToAngle(char, angle, amount, updateChar) {
  if (angle.reflections === undefined) {
    angle.reflections = 0;
  }

  if (angle.visible) {
    angle.reflections += amount;
  }

  if (angle.reflections > angle.maxReflections - 1) {
    angle.reflections = angle.maxReflections - 1;
  }

  if (amount > 0) {
    angle.visible = true;
  }

  if (angle.reflections < 0) {
    angle.reflections = 0;
    angle.visible = false;
  }

  if (updateChar && angle.visible && charImagesOn) {
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


function toggleJetBubbleForAngle(charName, angleName) {
  var char = loadChar(charName);
  var angle = char.angles.find(function(e){ return e.name == angleName });

  angle.visible = true;
  if (angle.reflections == 'undefined' || isNaN(angle.reflections)) {
    angle.reflections = 0;
  }

  if(angle.bubble) {
    angle.bubble = false;
    angle.maxDistance = undefined;
  } else {
    angle.bubble = true;
    angle.maxDistance = char.maxBubbleDistance;
  }
}

function getGridTeleportSprite(char, teleportStep) {
  var pose = poseOfName(char, "swing");
  if (teleportStep < char.teleport.length) {
    var teleportData = char.teleport[teleportStep];
    if (teleportData.spike) {
      pose = poseOfName(char, "spike");
    } else if (teleportData.direction.y < 0) {
      pose = poseOfName(char, "smash");
    }
  }
  var facing = char.facing;
  if (teleportData.direction.x > 0) {
    facing = 'right';
  } else if (teleportData.direction.x < 0) {
    facing = 'left';
  } else if (teleportStep > 0) {
    var previousData = getGridTeleportSprite(char, teleportStep - 1);
    facing = previousData[1];
  }
  return [pose, facing];
}

function addGridTeleport(char, teleportDirection) {
  var data = {direction: teleportDirection, spike: false};
  char.teleport.push(data);
}

function undoGridTeleport(char) {
  if (char.teleport.length > 0) {
    char.teleport.splice(char.teleport.length - 1, 1);
  }
}

function toggleGridTeleportSpike(char) {
  if (char.teleport.length > 0) {
    var teleportData = char.teleport[char.teleport.length - 1];
    teleportData.spike = !teleportData.spike;
  }
}

function getGridTeleportReleaseLocation(char, pose, facing, hurtbox) {
  var fixedReleaseOffset = new Point(pose.teleportRelease[0], pose.teleportRelease[1]);
  var rightPoint = hurtbox.topLeft + fixedReleaseOffset;
  fixedReleaseOffset.x *= -1;
  var leftPoint = hurtbox.topRight + fixedReleaseOffset;
  clampPointToRect(leftPoint, ballStageRect);
  clampPointToRect(rightPoint, ballStageRect);
  if (facing == "left") {
    return leftPoint;
  } else {
    return rightPoint;
  }
}

function flipDirectionFacing(char) {
  var hurtbox = char.getRelativeHurtbox();
  hurtbox.x += char.imgOffset.x;
  hurtbox.y += char.imgOffset.y;
  var relativeBallPosition = hurtbox.bottomCenter;

  char.facing = char.facing == 'right' ? 'left' : 'right'

  if (charImagesOn) {
    var nextHurtbox = char.getRelativeHurtbox();
    nextHurtbox.x += char.imgOffset.x;
    nextHurtbox.y += char.imgOffset.y;
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

  var deltaGroundOffset = 0;
  if (char.pose.groundOffset) {
    deltaGroundOffset = char.pose.groundOffset;
  }
  char.pose = nextPose;
  if (char.pose.groundOffset) {
    deltaGroundOffset -= char.pose.groundOffset;
  }

  var nextHurtbox = char.getRelativeHurtbox();
  var delta = hurtbox.bottomCenter - nextHurtbox.bottomCenter;
  char.imgOffset.x += delta.x;
  char.imgOffset.y += delta.y + deltaGroundOffset;
}

function poseOfName(char, poseName) {
  for (var i = 0; i < char.poses.length; i++) {
    if (char.poses[i].name == poseName) {
      return char.poses[i];
    }
  }
  console.log("Could not find pose of name: " + poseName + " for char: " + char.name);
  return char.pose; //fallback, should never be necessary...
}

function startDragging(char, dontDragCharImage) {
  dragok = true;
  char.isDragging = true;
  char.dontDragCharImage = dontDragCharImage;
}

function updateTooltip(tooltip, text, position) {
  tooltipText = text;
  tooltipLocation = position;
  tooltip.content = text;
  tooltip.point = position + tooltipOffset;
}

function hideTooltip(tooltip) {
  tooltipText = '';
  tooltip.content = '';
}

function getFixedReleaseLocations(char) {
  var fixedReleaseOffset = new Point(char.pose.fixedRelease[0], char.pose.fixedRelease[1]);
  var hurtbox = char.getHurtbox();
  var rightPoint = hurtbox.topLeft + fixedReleaseOffset;
  fixedReleaseOffset.x *= -1;
  var leftPoint = hurtbox.topRight + fixedReleaseOffset;
  clampPointToRect(leftPoint, ballStageRect);
  clampPointToRect(rightPoint, ballStageRect);
  if (char.facing == "left") {
    return [leftPoint, rightPoint];
  } else {
    return [rightPoint, leftPoint];
  }
}

function drawLine(start, degrees) {
  // use canvas width * 2 to ensure line is long enough in any situation
  var end = new Point(start.x + canvas.getBoundingClientRect().width * 2, start.y)
  var line = new Path()
  line.add(start, end)
  line.rotate(degrees, start)

  return line
}

function drawLineSegment(start, end) {
  var line = new Path();
  line.add(start, end);
  return line;
}

function drawAngle(properties, angle, startingPoint, mirrored) {
  var degrees = (properties.facing == 'left' ^ mirrored) ? (angle.degrees + 180) * -1 : angle.degrees
  var start = startingPoint;

  var distanceTravelled = 0;

  if (angle.bunt || angle.pong) {
    var velocity = new Point(angle.initialSpeed, 0);
    velocity = velocity.rotate(degrees);
    if (angle.pong) {
      var turnRate = angle.turnRate * 1.55;
      var turnDir = 1;
      if (velocity.x < 0) {
        turnDir = -1;
      }
    }
  }

  /** text label */
  if (labelsOn) {
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
      label.content = getAngleLabelText(angle);
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

  var invalid = false // no use-y for now
  for(var i = 0; i <= angle.reflections; ++i) {

    if (angle.bunt) {
      var arcTargetPos = start;
      for (var b = 0; b < angle.buntStep; b++) {
        var wasUpwards = velocity.y < 0;
        arcTargetPos += velocity;
        velocity.y += angle.gravity * (1 / 60);
        if (velocity.y > angle.maxGravity) {
          velocity.y = angle.maxGravity;
        }
        if (wasUpwards && velocity.y >= 0) {
          break;
        }
        if (arcTargetPos.y > ballStageRect.bottom) {
          break;
        }
      }
      var line = drawLineSegment(start, arcTargetPos);
    } else if (angle.pong) {
      var arcTargetPos = start;
      for (var p = 0; p < angle.pongStep; p++) {
        arcTargetPos += velocity;

        turnRate -= 6 * (1 / 60);
        if (turnRate <= 0) {
          turnRate = 0;
        }
        degrees += turnRate * turnDir;
        velocity = velocity.rotate(turnRate * turnDir);
      }
      var line = drawLineSegment(start, arcTargetPos);
    } else {
      var line = drawLine(start, degrees)
    }

    var hitHurtBoxCollision = false;
    var hitHurtBoxPoint;
    var hitHurtBox;
    var closestDistance;
    var itHurts = false;
    if (charImagesOn && !ignoreHitboxCollisions) {
      for (var j = 0; j < activeEntities.length; j++) {
        var entity = activeEntities[j];
        if (entity == properties) {
          continue;
        }
        if (!entity.ignoreHitboxCollisions) {
          var hitboxes = entity.getHitboxes();
          for (var k = 0; k < hitboxes.length; k++) {
            var hitbox = hitboxes[k];
            var hitboxExpanded = hitbox.expand(ballDiameter);
            var hitboxPath;
            var hitboxPathExpanded;
            if (entity.pose.circle) {
              hitboxPath = new Path.Circle(hitbox.center, hitbox.width / 2);
              hitboxPathExpanded = new Path.Circle(hitboxExpanded.center, hitboxExpanded.width / 2);
            } else {
              hitboxPath = new Path.Rectangle(hitbox);
              hitboxPathExpanded = new Path.Rectangle(hitboxExpanded);
            }
            var intersections = line.getIntersections(hitboxPathExpanded);
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
        }
        if (!entity.ignoreHurtboxCollisions && !angle.bunt) {
          var hurtbox = entity.getHurtbox();
          var expandedHurtbox = hurtbox.expand(ballDiameter);
          var hurtboxPathExpanded = new Path.Rectangle(expandedHurtbox);
          var intersections = line.getIntersections(hurtboxPathExpanded);
          for (var l = 0; l < intersections.length; l++) {
            var intersection = intersections[l];
            var dist = start.getDistance(intersection.point);
            var epsilon = 0.0001;
            if (!hitHurtBoxCollision || dist < closestDistance - epsilon) {
              hitHurtBoxCollision = true;
              hitHurtBoxPoint = intersection.point;
              hitHurtBoxPath = new Path.Rectangle(hurtbox);
              closestDistance = dist;
              itHurts = true;
            }
          }
        }
      }
    }

    var stopPoint = hitHurtBoxPoint;
    var hitStageBoundary = false;

    if (!hitHurtBoxCollision) {
      // get new starting point from reflection point
      var intersections = line.getIntersections(ballStageBounds);
      //for(var i in intersections) console.log(intersections[i].point.x, intersections[i].point.y)
      var intersectPoint = intersections.length ? intersections[intersections.length-1].point : false
      if (!intersectPoint) {
        if (angle.bunt || angle.pong) {
          intersectPoint = arcTargetPos;
        } else {
          break;
        }
      } else {
        hitStageBoundary = true;
        if (angle.bunt) {
          velocity.y = 0;
          intersectPoint.y += 1;
        }
      }

      stopPoint = intersectPoint;
    }

    var vector = stopPoint - start;

    var maxDistanceReached = false;
    if(angle.maxDistance !== undefined && distanceTravelled + vector.length > angle.maxDistance) {
      var distanceDelta = angle.maxDistance - distanceTravelled;
      stopPoint = start + vector.normalize(distanceDelta);
      vector = stopPoint - start;
      if(angle.bubble){
        var bubble = new Raster("assets/characters/bubble_burst.png");
        bubble.position.x = stopPoint.x;
        bubble.position.y = stopPoint.y;
        bubble.sendToBack();
      }
      hitHurtBoxCollision = false;
      maxDistanceReached = true;
    }
    distanceTravelled += vector.length;

    // draw ball hitbox at impact location
    if (showBallImpactLocations) {
      var ballHitbox = new Rectangle(new Point(stopPoint.x - ballRadius + 2, stopPoint.y - ballRadius + 2), new Size(ballDiameter - 4, ballDiameter - 4));
      var ballHitboxPath = new Path.Rectangle(ballHitbox);
      ballHitboxPath.strokeColor = angle.bunt ? 'purple' : 'blue';
      ballHitboxPath.strokeWidth = 4;
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

    var arrows = new Group();
    if (guidesOn) {
      arrows.addChildren(addArrows(start, vector, 1, true));
    }

    if (hitHurtBoxCollision) {
      if (itHurts) {
        hitHurtBoxPath.fillColor = 'lightskyblue';
      } else {
        hitHurtBoxPath.fillColor = '#ffc2c4';
      }
      hitHurtBoxPath.sendToBack();
    } else {
      // new start for next reflection
      start = stopPoint.clone()

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

      } else if (!angle.bunt && !angle.pong) {
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
    }

    // style all arrows
    arrows.strokeWidth = 4
    arrows.strokeColor = guideColor
    arrows.strokeCap = 'round'
    guides.push(arrows)

    if ((angle.pong && hitStageBoundary)
      || (angle.bunt && hitStageBoundary && start.y > ballStageRect.top + 2)
      || hitHurtBoxCollision
      || maxDistanceReached) {
      break;
    }
    if (angle.bunt || angle.pong) {
      i--;
    }
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

  var tooltip = new PointText(tooltipLocation + tooltipOffset);
  tooltip.fillColor = 'white';
  tooltip.fontSize = 20;
  tooltip.shadowColor = 'black';
  tooltip.shadowBlur = 3;
  tooltip.content = tooltipText;

  for(var i = 0; i < loadedChars.length; i++) {
    var char = loadedChars[i]
    if(!char.x) {
      char.x = Math.floor(Math.random() * (canvas.getBoundingClientRect().width - 400)) + 200
      char.y = Math.floor(Math.random() * (canvas.getBoundingClientRect().height - 100)) + 50
    }

    // Draw character first so it's below lines and icon buttons
    if (charImagesOn) {

      if (char.reticle && char.pose.canSpecial) {
        var raster = new Raster("assets/characters/" + char.reticle.imageName + ".png");
        raster.position.x = char.reticle.x;
        raster.position.y = char.reticle.y;
        raster.scaling = char.reticle.imageScale;
      }

      if (char.spray) {
        var raster = new Raster("assets/characters/" + char.spray.imageName + ".png");
        raster.position.x = char.spray.x;
        raster.position.y = char.spray.y;
        raster.scaling = char.spray.imageScale;
      }

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
      if (char.facing == "left") { //TODO: use proper image for left/right not just flipping the sprite
        r.scale(-1, 1);
      }
      if (char.name == "Grid" && char.pose.canSpecial) {
        var gridHurtbox = char.getHurtbox();

        var t = 22;
        if (char.teleport.length < char.maxTeleports) {
          var icon = createButtonWithTooltip("right", "Teleport Right", tooltip);
          icon.position.x = gridHurtbox.center.x + t;
          icon.position.y = gridHurtbox.center.y;
          icon.char = char;
          icon.onMouseDown = function(event) {
            addGridTeleport(this.char, new Point(1, 0));
            draw();
          }
          var icon = createButtonWithTooltip("left", "Teleport Left", tooltip);
          icon.position.x = gridHurtbox.center.x - t;
          icon.position.y = gridHurtbox.center.y;
          icon.char = char;
          icon.onMouseDown = function(event) {
            addGridTeleport(this.char, new Point(-1, 0));
            draw();
          }
          var icon = createButtonWithTooltip("up", "Teleport Up", tooltip);
          icon.position.x = gridHurtbox.center.x;
          icon.position.y = gridHurtbox.center.y - t;
          icon.char = char;
          icon.onMouseDown = function(event) {
            addGridTeleport(this.char, new Point(0, -1));
            draw();
          }
          var icon = createButtonWithTooltip("down", "Teleport Down", tooltip);
          icon.position.x = gridHurtbox.center.x;
          icon.position.y = gridHurtbox.center.y + t;
          icon.char = char;
          icon.onMouseDown = function(event) {
            addGridTeleport(this.char, new Point(0, 1));
            draw();
          }
        }
        if (char.teleport.length > 0) {
          var icon = createButtonWithTooltip("special", "Spike Teleport", tooltip);
          icon.position.x = gridHurtbox.center.x - t;
          icon.position.y = gridHurtbox.center.y + t;
          icon.char = char;
          icon.onMouseDown = function(event) {
            toggleGridTeleportSpike(this.char);
            draw();
          }
          var icon = createButtonWithTooltip("back", "Undo Teleport", tooltip);
          icon.position.x = gridHurtbox.center.x + t;
          icon.position.y = gridHurtbox.center.y + t;
          icon.char = char;
          icon.onMouseDown = function(event) {
            undoGridTeleport(this.char);
            draw();
          }
        }

        for (var g = 0; g < char.teleport.length; g++) {
          var teleportData = char.teleport[g];
          var spriteData = getGridTeleportSprite(char, g);
          var r = new Raster(char.getGridTeleportImageForPose(spriteData[0], spriteData[1]));
          gridHurtbox.x += teleportData.direction.x * char.teleportDistance;
          gridHurtbox.y += teleportData.direction.y * char.teleportDistance;
          clampRectInsideRect(gridHurtbox, trueStageRect);

          teleportData.hurtbox = new Rectangle(gridHurtbox);
          teleportData.pose = spriteData[0];
          teleportData.facing = spriteData[1];

          var relativeHurtbox = char.getRelativeHurtboxForPose(spriteData[0], spriteData[1]);
          r.position.x = gridHurtbox.left - relativeHurtbox.left;
          r.position.y = gridHurtbox.top - relativeHurtbox.top;
          r.opacity = 0.5;
          if (spriteData[1] == "left") { //TODO: use proper image for left/right not just flipping the sprite
            r.scale(-1, 1);
          }
          r.sendToBack();
        }
      }
      if (char.pose.hasAngle) {
        var ball = new Raster("assets/characters/ball.png");
        ball.position.x = char.x;
        ball.position.y = char.y;
      }
      var groundOffset = 0;
      if (char.pose.groundOffset) {
        groundOffset = char.pose.groundOffset;
      }
      var hurtbox = char.getRelativeHurtbox();
      var iconSize = new Size(20, 20);
      var iconsX = char.x + char.imgOffset.x + hurtbox.bottomCenter.x - 50 + iconSize.width / 2;
      var iconsY = char.y + char.imgOffset.y + hurtbox.bottomCenter.y - char.baseHeight - iconSize.height / 2 + groundOffset;
      iconsX = Math.max(iconSize.width / 2, iconsX);
      iconsY = Math.max(iconSize.height / 2, iconsY);
      var icon = createButtonWithTooltip("flip", "Flip", tooltip);
      var iconPosition = 0;
      var iconSpacing = 22;
      icon.position.x = iconsX + iconPosition;
      icon.position.y = iconsY;
      iconPosition += iconSpacing;
      icon.char = char;
      icon.onMouseDown = function(event) {
        flipDirectionFacing(this.char);
        draw();
      }
      var icon = createButtonWithTooltip("toggle", "Toggle Buttons", tooltip);
      icon.position.x = iconsX + iconPosition;
      icon.position.y = iconsY;
      iconPosition += iconSpacing;
      icon.char = char;
      icon.onMouseDown = function(event) {
        toggleDirectButtons(this.char);
        draw();
      }
      var icon = createButtonWithTooltip("pose", "Change Pose", tooltip);
      icon.position.x = iconsX + iconPosition;
      icon.position.y = iconsY;
      iconPosition += iconSpacing;
      icon.char = char;
      icon.onMouseDown = function(event) {
        nextPose(this.char);
        draw();
      }
      if (char.pose.canParry) {
        var icon = createButtonWithTooltip("parry", "Parry", tooltip);
        icon.position.x = iconsX + iconPosition;
        icon.position.y = iconsY;
        iconPosition += iconSpacing;
        icon.char = char;
        icon.onMouseDown = function(event) {
          this.char.parry = !this.char.parry;
          draw();
        }
      }
      if (char.pose.canMirror) {
        var buttonText = "Mirror Special Angles";
        if (char.pose.name == "grab") {
          buttonText = "Mirror Throw Angles";
        }
        var icon = createButtonWithTooltip("mirror", buttonText, tooltip);
        icon.position.x = iconsX + iconPosition;
        icon.position.y = iconsY;
        iconPosition += iconSpacing;
        icon.char = char;
        icon.onMouseDown = function(event) {
          toggleMirrorAngles(this.char);
          draw();
        }
      }
      if (char.name == "Doombox" && char.pose.canSpecial) {
        var icon = createButtonWithTooltip("special", "Toggle Special", tooltip);
        icon.position.x = iconsX + iconPosition;
        icon.position.y = iconsY;
        iconPosition += iconSpacing;
        icon.char = char;
        icon.onMouseDown = function(event) {
          toggleDoomboxAimReticle(this.char);
          draw();
        }
      }
      if (char.name == "Toxic") {
        var icon = createButtonWithTooltip("special", "Spray", tooltip);
        icon.position.x = iconsX + iconPosition;
        icon.position.y = iconsY;
        iconPosition += iconSpacing;
        icon.char = char;
        icon.onMouseDown = function(event) {
          toggleToxicSpray(this.char);
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

    if (char.name == "Grid" && charImagesOn && char.pose.canSpecial) {
      for (var g = 0; g < char.teleport.length; g++) {
        var teleportData = char.teleport[g];
        var startingPoint = getGridTeleportReleaseLocation(char, teleportData.pose, teleportData.facing, teleportData.hurtbox);
        var mirrored = char.facing != teleportData.facing;
        var teleportAngle = teleportData.pose.teleportAngle;
        var ball = new Raster("assets/characters/ball.png");
        ball.position.x = startingPoint.x;
        ball.position.y = startingPoint.y;
        ball.opacity = 0.5;
        if (teleportAngle.visible) {
          drawAngle(char, teleportAngle, startingPoint, mirrored);
        }
        addAngleButtons(char, teleportAngle, startingPoint, teleportData.facing, false, tooltip);
      }
    }

    if (char.reticle && charImagesOn && char.pose.canSpecial) {
      var startingPoint = new Point(char.x, char.y);
      var targetPoint = new Point(char.reticle.x, char.reticle.y);
      var delta = targetPoint - startingPoint;
      for (var k = 0; k < char.reticle.angles.length; k++) {
        var snipeAngle = char.reticle.angles[k];
        var directionMultiplier = (delta.angle > -90 && delta.angle < 90) ? -1 : 1;

        snipeAngle.degrees = delta.angle + char.specialAngle * directionMultiplier * snipeAngle.snipeMultiplier;
        if (snipeAngle.visible) {
          drawAngle(char, snipeAngle, startingPoint, char.facing == "left");
        }
      }
      for (var k = 0; k < char.reticle.angles.length; k++) {
        var snipeAngle = char.reticle.angles[k];
        var nonFlippedFacing = "right";
        addAngleButtons(char, snipeAngle, startingPoint, nonFlippedFacing, false, tooltip);
      }
    }

    for (var j = 0; j < char.angles.length; j++) {
      var currentAngle = char.angles[j];
      if ((charImagesOn && currentAngle.validWhen.indexOf(char.pose.name) < 0) || (currentAngle.hidden && !charImagesOn)) {
        continue;
      }
      if (currentAngle.visible) {
        var startingPoint = new Point(char.x, char.y);
        var mirroredStartingPoint = new Point(char.x, char.y);
        if (char.pose.fixedRelease && charImagesOn) {
          var fixedReleaseLocations = getFixedReleaseLocations(char);
          startingPoint = fixedReleaseLocations[0];
          mirroredStartingPoint = fixedReleaseLocations[1];
        }
        if (char.mirrorAngles && char.pose.canMirror && currentAngle.mirror) {
          drawAngle(char, currentAngle, mirroredStartingPoint, true);
        }
        drawAngle(char, currentAngle, startingPoint, false);
      }
      if (char.showDirectButtons && (charImagesOn || !currentAngle.hidden)) {
        if (currentAngle.labels === undefined) {
          //angles that are identical to other angles have no labels; skip those
          continue;
        }
        var position = new Point(char.x, char.y);
        addAngleButtons(char, currentAngle, position, char.facing, true, tooltip);
      }
    }

    labels.forEach(function(e) { e.bringToFront(); })
    guides.forEach(function(e) { e.bringToFront(); })
  }
  tooltip.bringToFront();

  paper.view.update()
  window.canvas = canvas;
  window.sb = ballStageBounds;
}

function createButtonWithTooltip(iconName, tooltipText, tooltip) {
  var icon = new Raster("assets/icons/" + iconName + ".png");
  icon.tooltipText = tooltipText;
  icon.onMouseEnter = function(event) {
    updateTooltip(tooltip, this.tooltipText, this.position);
  }
  icon.onMouseLeave = function(event) {
    hideTooltip(tooltip);
  }
  return icon;
}

function addAngleButtons(char, angle, position, facing, basicAngle, tooltip) {
  var offset = 80;
  if (angle.customOffset) {
    offset = angle.customOffset;
  }
  var icon = createButtonWithTooltip("plus", getAngleLabelText(angle) + " (+)", tooltip);
  var vector = new Point(offset, 0);
  vector = vector.rotate(angle.degrees);
  if (facing == 'left') {
    vector.x *= -1;
  }
  icon.position.x = position.x + vector.x;
  icon.position.y = position.y + vector.y;
  icon.angle = angle;
  icon.char = char;
  icon.onMouseDown = function(event) {
    addReflectionsToAngle(this.char, this.angle, 1, basicAngle);
    draw();
  }
  if (angle.visible) {
    var icon = createButtonWithTooltip("minus", getAngleLabelText(angle) + " (-)", tooltip);
    var vector = new Point(offset - 20, 0);
    vector = vector.rotate(angle.degrees);
    if (facing == 'left') {
      vector.x *= -1;
    }
    icon.position.x = position.x + vector.x;
    icon.position.y = position.y + vector.y;
    icon.angle = angle;
    icon.char = char;
    icon.onMouseDown = function(event) {
      addReflectionsToAngle(this.char, this.angle, -1, basicAngle);
      draw();
    }
  }
  if (char.name == "Candyman" && char.pose.canSpecial) {
    var icon = createButtonWithTooltip("special", getAngleLabelText(angle) + " (Toggle Candywarp)", tooltip);
    var vector = new Point(offset + 20, 0);
    vector = vector.rotate(angle.degrees);
    if (facing == 'left') {
      vector.x *= -1;
    }
    icon.position.x = position.x + vector.x;
    icon.position.y = position.y + vector.y;
    icon.angleName = angle.name;
    icon.charName = char.name;
    icon.onMouseDown = function(event) {
      addCandySpecialToAngle(this.charName, this.angleName);
      draw();
    }
  }
  if (char.name == "Jet" && char.pose.canSpecial) {
    var icon = createButtonWithTooltip("bubble", getAngleLabelText(angle) + " (Toggle Bubble)", tooltip);
    var vector = new Point(offset + 20, 0);
    vector = vector.rotate(angle.degrees);
    if (facing == 'left') {
      vector.x *= -1;
    }
    icon.position.x = position.x + vector.x;
    icon.position.y = position.y + vector.y;
    icon.angleName = angle.name;
    icon.charName = char.name;
    icon.onMouseDown = function(event) {
      toggleJetBubbleForAngle(this.charName, this.angleName);
      draw();
    }
  }
}

function clampPointToRect(point, rect) {
  if (point.x < rect.left) {
    point.x = rect.left;
  } else if (point.x > rect.right) {
    point.x = rect.right;
  }
  if (point.y < rect.top) {
    point.y = rect.top;
  } else if (point.y > rect.bottom) {
    point.y = rect.bottom;
  }
}

function clampRectInsideRect(smallRect, bigRect) {
  if (smallRect.left < bigRect.left) {
    smallRect.x += bigRect.left - smallRect.left;
  }
  if (smallRect.right > bigRect.right) {
    smallRect.x += bigRect.right - smallRect.right;
  }
  if (smallRect.top < bigRect.top) {
    smallRect.y += bigRect.top - smallRect.top;
  }
  if (smallRect.bottom > bigRect.bottom) {
    smallRect.y += bigRect.bottom - smallRect.bottom;
  }
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
  for (var i = 0; i < activeEntities.length; i++) {
    var s = activeEntities[i];
    // decide if the shape is a rect or circle
    if (s.width) {
      // test if the mouse is inside this rect
      if (mx > s.x - s.width / 2 && mx < s.x + s.width / 2 && my > s.y - s.height / 2 && my < s.y + s.height / 2) {
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
      if (ballRect.contains(mousePoint) && !s.pose.fixedRelease) {
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
  for (var i = 0; i < activeEntities.length; i++) {
    var entity = activeEntities[i];
    if (entity.isDragging && entity.stickToBoundaries) {
      var hurtbox = entity.getHurtbox();
      var distFromTop = trueStageRect.top - hurtbox.top;
      var distFromBottom = trueStageRect.bottom - hurtbox.bottom;
      var distFromLeft = trueStageRect.left - hurtbox.left;
      var distFromRight = trueStageRect.right - hurtbox.right;

      var smallestDistance = Math.abs(distFromTop);
      var closestWall = 'up';
      if (Math.abs(distFromBottom) < smallestDistance) {
        smallestDistance = Math.abs(distFromBottom);
        closestWall = 'down';
      }
      if (Math.abs(distFromLeft) < smallestDistance) {
        smallestDistance = Math.abs(distFromLeft);
        closestWall = 'left';
      }
      if (Math.abs(distFromRight) < smallestDistance) {
        smallestDistance = Math.abs(distFromRight);
        closestWall = 'right';
      }

      if (closestWall == 'up') {
        entity.y += distFromTop;
      } else if (closestWall == 'down') {
        entity.y += distFromBottom;
      } else if (closestWall == 'left') {
        entity.x += distFromLeft;
      } else if (closestWall == 'right') {
        entity.x += distFromRight;
      }
      draw();
    }
    entity.isDragging = false;
    entity.isDraggingBallLocation = false;
  }
}

// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {
    // if the mouse is released outside the browser window, we can miss the mouseup event
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
    for (var i = 0; i < activeEntities.length; i++) {
      var s = activeEntities[i];
      if (!s.isCharacter) {
        if (s.isDragging) {
          s.x += dx;
          s.y += dy;
        }
      } else {
        if (s.isDragging) {
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
          var sx_half = s.pose.imgSize[0] / 2 + ballRadius;
          var sy_half = s.pose.imgSize[1] / 2 + ballRadius;
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
      }
      if (typeof s.getHurtbox === 'function') {
        var hurtbox = s.getHurtbox()
        if (charImagesOn) {
          if (s.pose.wall) {
            if (s.facing == 'right') {
              s.x += trueStageRect.left - hurtbox.left;
            } else {
              s.x += trueStageRect.right - hurtbox.right;
            }
          } else {
            if (hurtbox.left < trueStageRect.left) {
              s.x += trueStageRect.left - hurtbox.left;
            }
            if (hurtbox.right > trueStageRect.right) {
              s.x += trueStageRect.right - hurtbox.right;
            }
          }
          if (s.pose.grounded) {
            s.y += trueStageRect.bottom - hurtbox.bottom - s.pose.groundOffset;
          } else {
            if (hurtbox.top < trueStageRect.top) {
              s.y += trueStageRect.top - hurtbox.top;
            }
            if (hurtbox.bottom > trueStageRect.bottom) {
              s.y += trueStageRect.bottom - hurtbox.bottom;
            }
          }
        }
      }
      if (typeof s.getHitboxes === 'function') {
        var hitboxes = s.getHitboxes();
        var closestHitbox = null;
        var closestDistance = null;
        if (charImagesOn) {
          if (s.pose.fixedRelease) {
            var fixedPoint = getFixedReleaseLocations(s)[0];
            var delta = new Point(fixedPoint.x - s.x, fixedPoint.y - s.y);
            s.x += delta.x;
            s.y += delta.y;
            s.imgOffset.x -= delta.x;
            s.imgOffset.y -= delta.y;
          } else if(hitboxes.length > 0) {
            for (var j = 0; j < hitboxes.length; j++) {
              var hitbox = hitboxes[j];
              hitbox = hitbox.expand(ballDiameter);
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
    addGeneralAngles(char);
    char.showDirectButtons = true;
    char.pose = char.poses[0];
    char.facing = 'right'
    char.isDragging = false
    char.imgOffset = {x: -55, y: 0}
    char.isCharacter = true;
    char.getImage = function() {
      return "assets/characters/" + this.img_name + "_" + this.pose.name + "_r.png";
    }
    char.getGridTeleportImageForPose = function(pose, direction) {
      var poseName = pose.name;
      if (pose.teleportImage) {
        poseName = pose.teleportImage;
      }
      return "assets/characters/" + this.img_name + "_" + poseName + "_r.png";
    }
    char.getHurtbox = function() {
      var box = this.pose.hurtboxes[0]
      if (this.facing == 'right') {
        return new Rectangle(new Point(this.x + this.imgOffset.x - this.pose.imgSize[0] / 2 + box[0], this.y + this.imgOffset.y - this.pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      } else {
        return new Rectangle(new Point(this.x + this.imgOffset.x - this.pose.imgSize[0] / 2 + (this.pose.imgSize[0] - box[0] - box[2]), this.y + this.imgOffset.y - this.pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      }
    }
    char.getRelativeHurtboxForPose = function(pose, facing) {
      var box = pose.hurtboxes[0]
      if (facing == 'right') {
        return new Rectangle(new Point(- pose.imgSize[0] / 2 + box[0], - pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      } else {
        return new Rectangle(new Point(- pose.imgSize[0] / 2 + (pose.imgSize[0] - box[0] - box[2]), - pose.imgSize[1] / 2 + box[1]), new Size(box[2], box[3]));
      }
    }
    char.getRelativeHurtbox = function() {
      return this.getRelativeHurtboxForPose(this.pose, this.facing);
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
          pose.hasAngle = true;
          if (pose.name == "pushbox" || pose.name == "grab" || pose.name == "bunt" || pose.name == "spit" || pose.name == "switchflip" || pose.name == "overheadswitchflip") {
            pose.canParry = false;
          } else {
            pose.canParry = true;
          }
          if (char.name == "Grid" || char.name == "Candyman" || char.name == "Jet") {
            // Every pose that can parry can also special
            pose.canSpecial = pose.canParry;
          }
          break;
        }
      }
    }
    characters.push(char)

    $('#menu ul').append('<li id='+char.name+'><span class="character">'+char.name+'</span> <span class="turn">&#8634;</span><ol class="angles hidden"></ol></li>')
    var prevAngle = null // for combining like angles
    for (var j = 0; j < char.angles.length; j++) {
      var angle = char.angles[j]
      angle.reflections = 0
      if (prevAngle && prevAngle.degrees == angle.degrees) {
        if (!angle.hidden) {
          $('li.'+char.name+'.'+prevAngle.name).append('<br>/ '+angle.name)
        }
        if (!Array.isArray(prevAngle.labels)) {
          prevAngle.labels = []
        }
        prevAngle.labels.push(angleAlias[angle.name] || angle.name)
      } else {
        if (!angle.hidden) {
          $('li#'+char.name+' ol').append('<li class="'+char.name+' '+angle.name+'"><span class="minus">-</span> '+angle.name+' <span class="plus">+</span></li>')
        }
        angle.labels = [angleAlias[angle.name] || angle.name]
        prevAngle = angle

        // special butttons
        if (!angle.hidden && char.name == 'Candyman') {
          $('li.'+char.name+'.'+angle.name).append('<span class="special" title="Add bounces (+) and click again to warp them">S</span>')
        }
        if (!angle.hidden && char.name == 'Jet') {
          $('li.'+char.name+'.'+angle.name).append('<span class="bubble" title="Toggle Bubble">B</span>')
        }
      }
    }

    $('#' + char.name).css('background-image', 'url("assets/characters/' + char.img_name + '_icon.png")');
    $('#' + char.name).css('background-size', '40px');
    $('#' + char.name).css('background-repeat', 'no-repeat');
    $('#' + char.name).css('background-position', 'right');
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
      addReflectionsToAngleByName(charName, angleName, 1);
    } else {
      addReflectionsToAngleByName(charName, angleName, -1);
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

  $('.bubble').on('click', function(e) {
    e.preventDefault()
    e.stopPropagation()

    var classes = $(e.target).parent().attr('class').split(/\s+/)
    var charName = classes[0]
    var angleName = classes[1]
    toggleJetBubbleForAngle(charName, angleName);

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
