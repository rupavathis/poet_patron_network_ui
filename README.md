This repo contains code for showcasing demo of a visualisation tool prototype for Irish bardic poetry showing relationship between the poets, the poems and their patrons. It also links them to their location and additional information such as motifs and categoris of poems. The data for this project is taken from the Bardic Poetry Database https://bardic.celt.dias.ie/. This project builds visualisation mechansim to poet patronage network, and also provides admin panel to perform operations on the database.

Ftontend technology - ReactJS Frontend (node version 12.16.1) with d3.js

Homepage:

In the homepage, particles.js library is used to create a wavy floating particles repelling in the screen. 

Poet-Patronage Network

 -> A d3.js library is used to create an undirected weighted graphs between the patron, poet and poem. The size of the nodes depends on the number of undirected connection between the nodes. On hovering the nodes, the connection between the hovered node is highlighted. 

 -> A legend for the graph is displayed below and gets highlighted depending the type of node that gets clicked. 

 -> Upon clicking the node, the details of the node are displayed on a panel on the top right. 
