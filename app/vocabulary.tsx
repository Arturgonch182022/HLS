import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';

interface Word {
    word: string;
    definition: string;
}

const words : Word[] = [
    { word: "A bicyclist hit-and-run",
        definition: "An accident in which a motorized vehicle collides with a person riding a bicycle (without an outboard engine), or the person collides with a moving motorized vehicle, causing injury."
    },
    { word: "A breach flood",
        definition: "A flood caused by the breaching of dams."
    },
    { word: "A breakthrough wave",
        definition: "A wave formed at the front of a water flow passing into a breach, which has a significant velocity of movement and has great destructive force."
    },
    { word: "A collision with a standing vehicle",
        definition: "An accident in which a moving motor vehicle collides with or strikes a standing motor vehicle."
    },
    { word: "A dam",
        definition: "A hydraulic structure (artificial dam) or a natural formation (natural dam) that restricts runoff, creates reservoirs and water level differences along a river channel."
    },
    { word: "A dormant volcano",
        definition: "A volcano that is not known to have erupted, but it has retained its shape and localized earthquakes occur beneath it."
    },
    { word: "A driver",
        definition: "A person who drives a vehicle, a driver who leads pack or riding animals or a herd on the road. A driver is equivalent to an instructor who teaches driving."
    },
    { word: "A field fire",
        definition: "A fire that occurs in an open area in the presence of dry grass or ripened crops."
    },
    { word: "A fire extinguisher",
        definition: "A technical device designed to extinguish fires in the initial stage of their occurrence."
    },
    { word: "A flood",
        definition: "A periodically recurring, relatively prolonged rise in the water level in rivers, usually caused by spring snowmelt on the plains or rainfall, as well as spring-summer snowmelt in the mountains; its consequence is flooding of low-lying areas."
    },
    { word: "A foam fire extinguisher",
        definition: "A technical device designed to extinguish fires with extinguishing foams: chemical or air-mechanical."
    },
    { word: "A forest fire",
        definition: "An uncontrolled burning of vegetation that spreads spontaneously through a forest area."
    },
    { word: "A forest highland (runaway) fire ",
        definition: "A fire that develops, usually from a lowland fire in high winds, when the fire advances through the crowns of trees."
    },
    { word: "A hit-and-run accident",
        definition: "An accident in which a motor vehicle collides with harnessed, pack or riding animals or with wagons transported by these animals."
    },
    { word: "A mass fire",
        definition: "A combination of individual and continuous fires."
    },
    { word: "A mudstone mudflow",
        definition: "A stream that predominantly contains coarse clastic material compared to the mud component."
    },
    { word: "A natural hazard",
        definition: "A natural phenomenon which, in terms of its intensity, scale of spread and duration of impact on the environment, may cause significant social and economic damage."
    },
    { word: "A pedestrian collision",
        definition: "An accident in which a motorized vehicle collides with a person or the person collides with a moving motorized vehicle, causing injury."
    },
    { word: "A powder fire extinguisher",
        definition: "A technical device used to extinguish all classes of ignitions and fires."
    },
    { word: "A reed fire",
        definition: "A fire caused by the ignition of dry reeds and emergent vegetation."
    },
    { word: "A roentgen",
        definition: "A dose of gamma radiation that creates 2.083 billion pairs of ions in 1 cm3 of dry air (at 0°C and a pressure of 760 mmHg)."
    },
    { word: "A seismic wave",
        definition: "A wave of energy that travels along the ground or other elastic bodies as a result of a process that produces low-frequency acoustic energy (earthquake, explosion, etc.)."
    },
    { word: "A soil (underground) or peat forest fire",
        definition: "A fire characterized by flameless burning of peat, accumulation of large amounts of heat, and low speed."
    },
    { word: "A thunderstorm",
        definition: "An atmospheric phenomenon accompanied by lightning and deafening rolls of thunder."
    },
    { word: "A tornado",
        definition: "An extremely rapidly rotating vortex hanging from a cumulonimbus cloud and observed as a 'funnel cloud' or 'pipe'."
    },
    { word: "A volcanic bomb",
        definition: "A fragment of rock more than 7 cm long."
    },
    { word: "A volcanic earthquake",
        definition: "An earthquake that occurs when a volcano erupts and often precedes it; it usually covers small areas and is accompanied by violent explosions, lava flows, ash clouds, and poisonous gases; underwater volcanic eruptions can produce huge waves (tsunamis) and create new islands."
    },
    { word: "A volcanic eruption",
        definition: "The release of molten material from the Earth's crust and mantle, called magma, onto the planet's surface."
    },
    { word: "A volcano",
        definition: "A geological formation occurring above channels and fissures in the Earth's crust through which molten rock (lava), ash, hot gases, water vapor, and debris erupt to the surface."
    },
    { word: "Accident",
        definition: "An extreme event of technogenic nature, which occurred as a result of external impacts or internal malfunctions or failure of elements of technical means, buildings, structures, resulting in human casualties."
    },
    { word: "Aerosol fire extinguisher",
        definition: "A technical device designed to extinguish flammable and combustible liquids, solids, live electrical installations and various materials, except for alkali metals and oxygen-containing substances."
    },
    { word: "Aircraft accident",
        definition: "A dangerous accident on an aircraft, in flight or in the process of evacuation, resulting in death or missing persons, bodily injury to victims, destruction or damage to the vessel and material valuables transported on it."
    },
    { word: "An active volcano",
        definition: "A volcano that has erupted during a historical period of time."
    },
    { word: "An extinct volcano",
        definition: "A volcano that does not show volcanic activity (eruptions are unlikely)."
    },
    { word: "Animal collision",
        definition: "An accident in which a motorized vehicle struck wild or domestic animals (excluding animals listed above)."
    },
    { word: "Annealing (counter-fire, counter-fall)",
        definition: "A method of extinguishing forest fires, in which a counter-fire burns combustible materials in the path of the main fire wall."
    },
    { word: "Anticyclone",
        definition: "An area of increased pressure in the atmosphere with a maximum in the center, characterized by a system of winds blowing clockwise in the Northern Hemisphere of the Earth and counterclockwise in the Southern Hemisphere."
    },
    { word: "Autonomous existence",
        definition: "Human being in certain, often complex, natural or other conditions of isolation, when the probability of help from people and the possibility of using technical and other achievements are limited or excluded."
    },
    { word: "Autonomous existence of man in the natural environment",
        definition: "His independent, autonomous existence in natural conditions."
    },
    { word: "Avalanche",
        definition: "Fast, sudden movement of snow and (or) ice down steep mountain slopes, posing a threat to human life and activity."
    },
    { word: "Aviation accident",
        definition: "A case of complete or partial destruction of an aircraft with passengers on board."
    },
    { word: "Bacteriological (biological) lesion",
        definition: "Cities, settlements and objects of national economy, exposed directly to bacterial (biological) agents, creating a source of spread of infectious diseases."
    },
    { word: "Bieff",
        definition: "Part of a river, canal, reservoir and other areas of water surface adjacent to a dam, sluice, etc. upstream or downstream."
    },
    { word: "Biological (bacteriological) weapons",
        definition: "Weapons of mass destruction intended for mass destruction of living forces, farm animals and crops, as well as spoilage of certain types of military materials and equipment (spoilage of food stocks, petroleum products, optical devices, electronic equipment) - ammunition and combat devices with means of delivery, equipped with biological agents."
    },
    { word: "Biological means",
        definition: "Pathogenic (pathogenic) microorganisms, agents of infectious diseases of humans and animals (bacteria, viruses, rickettsiae, fungi), spread by live infected disease vectors (rodents, insects) or in the form of powders and suspensions to cause mass diseases of people, farm animals and plants."
    },
    { word: "Breach",
        definition: "A narrow channel in the body (embankment) of a dam, spit, shoal, river delta, or a straightened section of the river formed as a result of erosion of a bend in a flood."
    },
    { word: "Carbon dioxide fire extinguisher",
        definition: "A technical device designed to extinguish ignitions of all types of combustible materials and energized electrical installations."
    },
    { word: "Catastrophe",
        definition: "An emergency event with death or non-fatal injury to 10 victims or more requiring urgent medical attention (WHO)."
    },
    { word: "Catastrophic flood zone",
        definition: "A flood zone within which mass losses of people, farm animals and plants have occurred, material values, primarily buildings and other structures, have been significantly damaged and destroyed."
    },
    { word: "Catastrophic flooding",
        definition: "A disaster due to hydrodynamic failure resulting from the failure of a dam and consists of the rapid inundation of the downstream area by a breach wave and the occurrence of flooding."
    },
    { word: "Chemical contamination zone",
        definition: "Territory and water area within which hazardous chemical substances in concentrations or quantities endangering human life and health, farm animals and plants for a certain period of time are distributed or introduced."
    },
    { word: "Civil defense",
        definition: "A system of measures to prepare for and protect the population, material and cultural values on the territory of the Russian Federation from hazards arising in the course of military operations or as a consequence of such operations, as well as in the event of natural and man-made emergencies."
    },
    { word: "Civil defense engineering measures",
        definition: "A set of measures carried out by engineering methods and means and aimed at preventing or reducing possible losses and destruction, increasing the stability of the facility in emergency situations, for the successful conduct of rescue and other emergency operations in the hearth of the defeat."
    },
    { word: "Civil defense forces",
        definition: "Military formations specially designed to solve problems in the field of civil defense, organizationally united into civil defense troops, as well as emergency rescue formations and rescue services."
    },
    { word: "Civil organizations of civil defense",
        definition: "Formations created on the basis of organizations on the territorial and production principle, not being part of the Armed Forces of the Russian Federation, possessing special equipment and property and prepared to protect the population and organizations from the dangers arising in the course of hostilities or as a consequence of these actions."
    },
    { word: "Collision with an obstacle",
        definition: "An accident in which a motor vehicle collides with or strikes a fixed object (bridge abutment, pole, tree, fence, etc.)."
    },
    { word: "Combustible Material",
        definition: "A material that, when exposed to fire or heat, ignites or smolders and continues to burn and smolder after the source of the fire is removed."
    },
    { word: "Combustion",
        definition: "A complex physical and chemical process of transformation of combustible substances and materials into combustion products, accompanied by intensive release of heat, smoke and light radiation."
    },
    { word: "Combustion zone",
        definition: "The space in which the combustion process takes place."
    },
    { word: "Complex hydraulic structures (hydrosystems)",
        definition: "Hydraulic structures united by a common purpose of operation, which combine dams, canals, sluices and power units (generators)."
    },
    { word: "Conventional means of destruction",
        definition: "Weapons that are based on the use of the energy of explosives (explosives) and incendiary mixtures (artillery, rocket and aviation ammunition, small arms, mines, incendiary ammunition and fire mixtures), as well as edged weapons."
    },
    { word: "Counter-fire (counter-fire, annealing)",
        definition: "A method of extinguishing forest fires, in which a counter-fire burns combustible materials in the path of the main wall of fire."
    },
    { word: "Critical water level",
        definition: "The level at the nearest hydrological post, the exceedance of which starts flooding of the territory."
    },
    { word: "Current disinfection",
        definition: "Disinfection carried out at the patient's bedside to prevent the spread of infection (disinfection of the patient's secretions and contaminated objects)."
    },
    { word: "Dangerous Goods",
        definition: "Dangerous substance, material, product and industrial waste, which due to their specific properties during transportation or overloading may pose a threat to human life and health, cause pollution of the environment, damage or destruction of transportation facilities, means and other property."
    },
    { word: "Decontamination",
        definition: "Removal of radioactive substances from a contaminated surface."
    },
    { word: "Degassing",
        definition: "The destruction of toxic chemicals, reducing them to non-toxic products or removing them from surfaces so that the degree of contamination is reduced to acceptable levels or disappears completely."
    },
    { word: "Deratization",
        definition: "Extermination of epidemiologically dangerous rodents (a private type of disinfection)."
    },
    { word: "Disinfection (disinfection)",
        definition: "A set of special measures aimed at the destruction of pathogens of contagious diseases in the human environment."
    },
    { word: "Disinsection",
        definition: "Killing insects and ticks that carry infectious diseases (a private type of disinfection)."
    },
    { word: "Dispersal",
        definition: "The organized removal (withdrawal) of workers and employees of national economy facilities from cities and their placement in the areas of the suburban zone, nearest to the boundaries of cities, located near railways, roads and waterways."
    },
    { word: "Dust storm",
        definition: "Transfer by a strong wind of a large amount of dust or sand, particles of the upper layer of dried soil not bound by vegetation, accompanied by deterioration of visibility, blowing out of the upper layer of soil together with seeds and youn"
    },
    { word: "Earthquake",
        definition: "Underground shocks (tremors) and vibrations of the Earth's surface caused by natural processes occurring in the Earth's crust."
    },
    { word: "Earthquake intensity",
        definition: "A measure of the magnitude of earthquake ground shaking in the area covered by the earthquake."
    },
    { word: "Earthquake source",
        definition: "A place in the Earth's depths where an earthquake originates, from where elastic seismic waves travel in all directions."
    },
    { word: "Emergency chemically hazardous substance",
        definition: "A hazardous chemical substance used in industry and agriculture, in case of emergency release (spillage) of which there may be contamination of the environment in concentrations affecting living organisms (toxoids)."
    },
    { word: "Emergency prevention",
        definition: "A set of measures carried out in advance and aimed at minimizing the risk of emergencies, as well as at preserving human health, reducing the amount of damage to the environment and material losses in case of their occurrence."
    },
    { word: "Emergency rescue formation",
        definition: "An independent or a part of the emergency rescue service structure designed to carry out emergency rescue work, the basis of which are units of rescuers equipped with special machinery, equipment, gear, tools and materials."
    },
    { word: "Emergency rescue service",
        definition: "A set of management bodies, forces and means designed to solve the tasks of prevention and elimination of emergency situations, functionally united in a single system, the basis of which are emergency rescue formations."
    },
    { word: "Explosion",
        definition: "A rapidly flowing process of physical and chemical transformations of substances, accompanied by the release of a significant amount of energy in a limited volume, as a result of which a shock wave is formed and propagates in the surrounding space, capable of leading or resulting in a man-made emergency."
    },
    { word: "Explosion- and fire-hazardous facilities",
        definition: "Enterprises where explosive and flammable substances are used in the production process, as well as railway and pipeline transport used for transportation (pumping) of fire and explosive substances."
    },
    { word: "Final disinfection",
        definition: "Disinfection carried out in the focus of infection after isolation, hospitalization, recovery or death of the patient in order to completely free the infectious focus from pathogens."
    },
    { word: "Fire",
        definition: "Uncontrolled combustion outside a special hearth, accompanied by destruction of valuables and posing a danger to human life."
    },
    { word: "Fire and explosion hazardous facilities",
        definition: "Enterprises where explosive and flammable substances are used in the production process, as well as railway and pipeline transport used for transportation (pumping) of fire and explosive substances."
    },
    { word: "Fire board",
        definition: "A board intended for placing primary fire extinguishing means, non-mechanized tools and fire fighting equipment in production and storage facilities not equipped with internal fire protection water supply and automatic fire extinguishing units"
    },
    { word: "Fire edge",
        definition: "A strip of burning that surrounds the outer contour of a forest fire and is immediately adjacent to areas that have not been penetrated by fire."
    },
    { word: "Fire safety regime of the enterprise",
        definition: "A set of measures and requirements of fire safety regime character, established in advance for the enterprise or individual premises and subject to mandatory fulfillment by all workers and employees."
    },
    { word: "Fire storm",
        definition: "A special form of spreading continuous fire, characterized by the presence of an upward flow of combustion products and heated air, as well as the inflow of fresh air from all sides at a speed of at least 50 km/h towards the boundaries of the fire storm."
    },
    { word: "Flame",
        definition: "The space in which vapors, gases, and suspended solids burn."
    },
    { word: "Flameless combustion",
        definition: "Combustion occurring in the form of smoldering of incandescent combustible substance on the surface (charcoal, coke, anthracite, soot, peat, and other materials that are not capable of emitting volatile products when heated)."
    },
    { word: "Flaming combustion",
        definition: "The combustion of matter and materials is accompanied by flames."
    },
    { word: "Flood",
        definition: "Significant inundation of an area resulting from a rise in the water level in a river, lake or sea, reservoir caused by abundant water inflow during snowmelt or heavy rainfall, 'wind' surges, jams, jams, dam failures."
    },
    { word: "Flood duration",
        definition: "The time an area is inundated."
    },
    { word: "Flood Map",
        definition: "A large-scale topographic map showing the locations and extent of flooding."
    },
    { word: "Flooded area",
        definition: "The size of the area covered by water (km2)."
    },
    { word: "Flooding",
        definition: "Covering an area with water."
    },
    { word: "Forced autonomy",
        definition: "A situation when a person accidentally, due to circumstances beyond his control, finds himself in the natural environment and is forced to independently provide for his life needs in order to survive and return to people."
    },
    { word: "Forest lowland fire",
        definition: "A fire characterized by burning of forest litter, ground cover, grass, deadwood, protruding roots and undergrowth without capturing tree crowns."
    },
    { word: "General hydraulic structures",
        definition: "Hydraulic structures used in all branches of water economy (dams, dikes, canals, flumes, tunnels, water intakes, weirs, spillways, culverts)."
    },
    { word: "Hail",
        definition: "Particles of dense ice falling as precipitation from powerful cumulus-rain clouds."
    },
    { word: "High floods",
        definition: "Floods that are accompanied by significant inundation of territories and cover large land areas of river valleys and lowlands. They significantly disrupt the economic and domestic life of the population, necessitate partial evacuation of people and animals, and cause tangible material damage. They occur once in 20-25 years."
    },
    { word: "Hostage taking",
        definition: "The unlawful  taking of a person accompanied by deprivation of liberty.  "
    },
    { word: "Hydrodynamic accident",
        definition: "An emergency event associated with the disabling (destruction) of a hydraulic structure or its part and uncontrolled movement of large masses of water, carrying destruction and flooding of vast areas."
    },
    { word: "Hydrosystems (complex hydraulic structures)",
        definition: "Hydraulic structures united by a common purpose of operation, which combine dams, canals, sluices and power units (generators)."
    },
    { word: "Ice",
        definition: "Frozen drops of supercooled rain or fog deposited on the cold surface of the Earth."
    },
    { word: "Ice jam",
        definition: "Piling of ice during spring ice drift in narrowings and bends of the river channel, constricting the flow and causing water level rise in the place of ice accumulation and some areas above it."
    },
    { word: "Industrial accident",
        definition: "An extreme event of technogenic origin at production facilities, resulting in failure, damage and destruction of technical devices and human casualties."
    },
    { word: "Initial fire safety briefing",
        definition: "Briefing conducted at the workplace by the person responsible for fire safety of the subdivision (shop, production area, laboratory, warehouse, workshop, etc.), with each employee separately: with all newly hired employees transferred from one subdivision to another or to perform a new job for them, seconded, students and pupils arriving for industrial practice or training, as well as with construction workers performing construction and installation work on the territory of the enterprise."
    },
    { word: "Introductory briefing",
        definition: "Briefing conducted with all newly hired employees (including temporary), regardless of their education, length of service in a given profession or position, as well as with secondees, pupils and students arriving for industrial practice or training."
    },
    { word: "Karst (from German Karst, after the name of the limestone plateau Kras in Slovenia)",
        definition: "A set of processes and phenomena associated with the activity of water and expressed in the dissolution of rocks and the formation of cavities in them, as well as peculiar landforms that arise in areas composed of rocks that are relatively easily soluble in water - gypsum, limestone, marble, dolomite and rock salt."
    },
    { word: "Landslide",
        definition: "Breakaway and catastrophic fall of large masses of rocks, their overturning, crushing and rolling on steep and precipitous slopes."
    },
    { word: "Landslide earthquake",
        definition: "Earthquake with local character, observed at collapse of vaults of underground karst cavities, shocks are weak and no significant destructions are observed."
    },
    { word: "Life safety",
        definition: "A field of scientific knowledge covering the theory and practice of human protection from dangerous and harmful factors in all spheres of human activity, preservation of safety and health in the environment."
    },
    { word: "Light radiation",
        definition: "A stream of radiant energy including ultraviolet, visible and infrared rays."
    },
    { word: "Lightning",
        definition: "A giant electrical spark discharge in the atmosphere in the form of a bright flash of light."
    },
    { word: "Liquidation of emergency situation",
        definition: "Rescue and other urgent works carried out in case of emergency situations and aimed at saving life and preserving human health, reducing environmental damage and material losses, as well as at localization of emergency zones, termination of hazardous factors characteristic of them."
    },
    { word: "Local emergency",
        definition: "An emergency situation, as a result of which no more than 10 people are affected, or the living conditions of no more than 100 people are disturbed, or the material damage is no more than 1 thousand minimum wage as of the day of the emergency and the emergency zone does not go beyond the territory of the facility of industrial or social importance."
    },
    { word: "Low (minor) floods",
        definition: "Floods that occur mainly in plain rivers and have a recurrence of about once every 5-10 years; when they occur, agricultural lands located in floodplains are flooded."
    },
    { word: "Magma",
        definition: "The molten matter of the Earth's crust and mantle that comes to the planet's surface."
    },
    { word: "Magnitude of an earthquake (from Latin magnitudo - magnitude)",
        definition: "A conventional value characterizing the energy released during an earthquake in the form of seismic waves."
    },
    { word: "Mudflow",
        definition: "A flow that is formed in areas where rocks are predominantly of clay composition, characterized by a significant content of clay and dust particles in the solid phase with their predominance over the rock component of the flow."
    },
    { word: "Mudflow or mudflow (from Arabic 'sail' - turbulent stream)",
        definition: "Mud or mud-stone flow, which suddenly appeared in the beds of mountain rivers due to a sharp flood caused by heavy rains, rapid melting of snow or glaciers."
    },
    { word: "Non-combustible materials",
        definition: "Materials that do not ignite, smolder or char when exposed to fire or heat"
    },
    { word: "Notification",
        definition: "The communication of notification signals and relevant information about the emergency situation to the day-to-day management bodies, RSChS forces and means and the population through the RSChS notification system."
    },
    { word: "Nuclear damage zone",
        definition: "An area directly affected by the impact factors of a nuclear explosion."
    },
    { word: "Observation regime",
        definition: "A regime of enhanced medical surveillance, established in the territory adjacent to the quarantine zone, is introduced when there is no need for a more stringent quarantine regime."
    },
    { word: "Orientation of the map",
        definition: "Giving it such a position that the north side of the map faces north and the lines and directions on the map are parallel to the lines and directions on the terrain."
    },
    { word: "Orienteering",
        definition: "Determining your position in relation to the horizon and local objects."
    },
    { word: "Outstanding floods",
        definition: "Floods that cover entire river basins, paralyze economic activity and disrupt the way of life of the population in large areas, cause great material damage; usually lead to the need for mass evacuation of the population and material resources from the flood zone and special measures to protect the most important economic facilities. They occur once every 50-100 years."
    },
    { word: "Panic",
        definition: "An emotional state arising as a consequence of either a lack of information about some frightening or incomprehensible situation, or its excessive excess and manifested in impulsive actions."
    },
    { word: "Passenger fall",
        definition: "An accident in which a passenger (any person other than the driver in or on the vehicle) falls from a moving motor vehicle. This type of accident does not include falls of persons occurring during collision, overturning of motor vehicles or their collision with fixed objects."
    },
    { word: "Penetrating radiation",
        definition: "The flux of gamma rays and neutrons."
    },
    { word: "Poisoning agents",
        definition: "Chemical compounds that, when used, can affect people and animals over large areas, penetrate various structures, and contaminate terrain and water bodies."
    },
    { word: "Preservation (quarantine)",
        definition: "A set of isolation and restrictive measures taken to prevent the spread of infectious diseases and eliminate the emerging focus."
    },
    { word: "Primary means of fire extinguishing",
        definition: "Devices, tools and materials designed to localize and (or) eliminate the fire at the initial stage (fire extinguishers, internal fire hydrant, water, sand, crampons, asbestos cloth, bucket, shovel, etc.)."
    },
    { word: "Production environment",
        definition: "Part of the human environment, including factors and elements (labor, natural environment) related to the creation of material goods."
    },
    { word: "Prophylactic disinfection",
        definition: "Disinfection carried out to prevent the possibility of infectious diseases or contamination from objects and things in common use."
    },
    { word: "Quarantine (observance)",
        definition: "A set of isolation and restrictive measures taken to prevent the spread of infectious diseases and eliminate the emerging focus."
    },
    { word: "Quarantine regime",
        definition: "A regime that provides for complete isolation of an area of infectious disease."
    },
    { word: "Radiation accident",
        definition: "An accident that resulted in the release of radioactive products and ionizing radiation beyond the limits provided by the project (boundaries of zones of operating equipment) of enterprises in quantities exceeding the established safety standards."
    },
    { word: "Radiation shelters",
        definition: "Special structures designed to protect people from ionizing radiation in case of radioactive contamination of the area."
    },
    { word: "Radiation-hazardous facilities",
        definition: "Facilities, in case of an accident at which or at destruction of which there may be an output of radioactive products or ionizing radiation beyond the values stipulated by the project for normal operation, which may lead to mass irradiation of people, farm animals and plants, as well as radioactive contamination of the natural environment above permissible standards."
    },
    { word: "Radioactive contamination zone",
        definition: "Territory subjected to contamination by radioactive substances as a result of their fallout after ground (underground) and low air nuclear explosions."
    },
    { word: "Railway accident",
        definition: "An accident on the railroad resulting in damage to one or more units of railroad rolling stock to the extent of overhaul and (or) the death of one or more people, causing bodily injuries of varying severity to the victims or a complete interruption of traffic on the emergency section exceeding the standard time."
    },
    { word: "Regional emergency",
        definition: "An emergency situation, as a result of which more than 50 but not more than 500 people are affected, or the living conditions of more than 500 but not more than 1,000 people are disturbed, or the material damage is more than 0.5 million but not more than 5 million minimum wage as of the day of the emergency and the emergency zone covers the territory of two subjects of the Russian Federation."
    },
    { word: "Repeated fire safety briefing",
        definition: "A briefing conducted according to the program of primary briefing with individual employees or groups of employees of the same profession in order to check and improve their knowledge of fire safety rules and instructions on fire safety measures, which must be passed by all employees regardless of qualification, length of service and education at least once every 6 months."
    },
    { word: "Road traffic accident",
        definition: "An accident that occurred in the course of movement of motor vehicles and resulted in death or bodily injury of people, damage to vehicles, structures, cargoes or other material damage."
    },
    { word: "Rollover",
        definition: "An accident in which a moving motor vehicle loses stability and overturns; this type of accident does not include rollovers caused by collision of motor vehicles or collision with fixed objects."
    },
    { word: "Security",
        definition: "A state of protection of an individual, society, state and the environment from internal and external threats or dangers."
    },
    { word: "Seiches (from Fr. Seiche)",
        definition: "Standing waves occurring in enclosed or partially enclosed bodies of water."
    },
    { word: "Seismograph",
        definition: "A device that records ground vibrations caused by seismic waves."
    },
    { word: "Separate fire",
        definition: "A fire in a separate building or structure. Movement of people and equipment through the built-up area between separate fires is possible without means of protection against heat radiation"
    },
    { word: "Shipwreck",
        definition: "Complete or partial sinking of a ship, damage to significant parts of the ship or impaired buoyancy, which occurred as a result of external and internal factors or objects."
    },
    { word: "Smoke zone",
        definition: "The space adjacent to the combustion zone that is filled with smoke."
    },
    { word: "Snow drifting",
        definition: "Heavy snowfall with wind speed over 15 m/s and snowfall duration of more than 12 hours"
    },
    { word: "Social environment",
        definition: "A set of factors and elements (moral, educational, legal, etc.) affecting the life and relationships between people."
    },
    { word: "Source of natural emergency",
        definition: "A dangerous natural phenomenon or process (volcanic eruption, landslide, landslide, mudslide, tsunami, flood, waterlogging, jam, strong wind, storm, tornado, dust storm, dry weather, fog, thunderstorm, natural fire)."
    },
    { word: "Strong poisonous substances",
        definition: "Toxic chemical substances used in industry, agriculture and transportation and capable of causing air contamination and mass casualties of people, farm animals and plants in case of leakage from destroyed (damaged) technological tanks, storages and equipment."
    },
    { word: "Suburban zone",
        definition: "An area located outside the zones of possible destruction, dangerous radioactive contamination and chemical contamination, as well as catastrophic flooding, outside the border areas, prepared in advance to accommodate the evacuated population and its primary life support."
    },
    { word: "The biosphere",
        definition: "The natural area of the distribution of life on Earth, including the lower atmosphere, hydrosphere, and upper lithosphere."
    },
    { word: "The crest",
        definition: "The highest part of the tsunami wave."
    },
    { word: "The sole",
        definition: "The lowest part of the tsunami wave."
    },
    { word: "The source of an emergency",
        definition: "A natural hazard, a dangerous man-made event (accident) or a widespread infectious disease of people, agricultural plants and animals."
    },
    { word: "The tsunami wave period",
        definition: "The time interval between the arrival of two consecutive tsunami waves."
    },
    { word: "Train derailment",
        definition: "Collision of a passenger or freight train with another train or rolling stock, derailment of a train from the railway track, resulting in death or injury of people, destruction of the locomotive or cars."
    },
    { word: "Tsunami velocity",
        definition: "The distance a tsunami travels in a certain amount of time."
    },
    { word: "Tsunami wavelength",
        definition: "The distance between neighboring tsunami wave crests (from 5 to 1500 km), making it impossible to see the second, third and subsequent waves."
    },
    { word: "Unscheduled fire safety briefing",
        definition: "A briefing that is conducted in the following cases: in case of changes in fire safety rules, instructions on fire safety measures; in case of changes in the technological process, application of new initial substances and materials, replacement or modernization of equipment and changes in other factors affecting fire safety."
    },
    { word: "Victimology",
        definition: "The science of victim behavior."
    },
    { word: "Voluntary autonomy",
        definition: "A situation when a person or group of people, of their own free will, for a specific purpose, for a certain period of time goes to independent existence in natural conditions"
    },
    { word: "Water discharge",
        definition: "The amount of water flowing through the cross-section of a river per second (m3/s)."
    },
    { word: "Water flow velocity",
        definition: "The rate at which water moves per unit time."
    },
    { word: "Water level rise rate",
        definition: "A value characterizing the water level increase over a certain period of time."
    },
    { word: "Water stream composition",
        definition: "A list of components found in a water stream."
    },
    { word: "Water volume",
        definition: "A measure of the quantity of water, measured in million meters2."
    },
    { word: "Water-fossiliferous mudflow",
        definition: "A stream with a predominance of coarse clastic material (the share of sandy-clay components is minimal), formed mainly in the zone of dense rocks."
    },
    { word: "Weapons of mass destruction",
        definition: "Weapons of great destructive power designed to inflict mass casualties and destruction (nuclear, chemical and biological (bacteriological) weapons)."
    },
    { word: "Wind surge",
        definition: "A rise in water level caused by the impact of wind on the water surface, usually occurring in the offshore estuaries of large rivers, as well as on the windward shore of large lakes, reservoirs and seas."
    },
    { word: "Zazhar",
        definition: "Accumulation of loose ice material during ice break-up (early winter) in narrowings and bends of the river channel, causing water level rise in some areas above it."
    }
];


const WordItem = ({ item }: { item: Word }) => (
    <View style={styles.wordContainer}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.definition}>{item.definition}</Text>
    </View>
);

export default function Vocabulary() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWords = words.filter(word =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dictionary</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredWords}
                renderItem={WordItem}
                keyExtractor={(item) => item.word}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
    list: {
        flex: 1,
        width: '100%',
    },
    wordContainer: {
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    word: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    definition: {
        fontSize: 16,
        color: '#555',
    },
});