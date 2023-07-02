---
title: The plasma kinetic equation
subtitle: By taking the emsemble average of the phase space density, we obtain the smoothed distribution function $f_s(\mathbf{x}, \mathbf{v}, t) = \langle \mathcal{N}_s(\mathbf{x}, \mathbf{v}, t) \rangle$. Similarly, by taking the emsemble average of the Klimontovich equation, we obtain the plasma kinetic equation.
layout: blog-post.njk
date: 2023-06-08
keywords: kinetic theory, plasma physics
publish: false
tags: posts
---

The Klimontovich equation tells us whether or not a particle with infinite density is to be found at a given point $(\mathbf{x}, \mathbf{v})$ in phase space. What we really want to know is how many particles are *likely* to be found in a small volume $\Delta\mathbf{x}\\, \Delta\mathbf{v}$ whose center is at $(\mathbf{x}, \mathbf{v})$. Thus, we are not interested in the spikey function $\mathcal{N}_s(\mathbf{x}, \mathbf{v}, t)$, but rather in the smooth function

$$
\begin{equation}
  f_s(\mathbf{x}, \mathbf{v}, t) = \langle \mathcal{N}_s(\mathbf{x}, \mathbf{v}, t) \rangle
\end{equation}
$$

The most rigourous way to interpret $\langle \dots \rangle$ is as an ensemble average over an infinite number of realisations of the plasma, prepared according to some prescription [what does this mean?].

Another useful interpretation of the distribution function $f_s(\mathbf{x}, \mathbf{v}, t)$ is the number of particles of species $s$ per unit configuration space per unit velocity space, that is

$$
\begin{equation}
  f_s(\mathbf{x}, \mathbf{v}, t) = \frac{1}{\Delta\mathbf{x}\\, \Delta\mathbf{v}}\int_{\Delta\mathbf{x}}\int_{\Delta\mathbf{v}} \mathcal{N}_s(\mathbf{x}, \mathbf{v}, t) \\, \mathrm{d}\mathbf{x} \\, \mathrm{d}\mathbf{v}
\end{equation}
$$

or alternatively

$$
\begin{equation}
  f_s(\mathbf{x}, \mathbf{v}, t) = \frac{\int_{\Delta\mathbf{x}}\int_{\Delta\mathbf{v}} \mathcal{N}_s(\mathbf{x}, \mathbf{v}, t) \\, \mathrm{d}\mathbf{x} \\, \mathrm{d}\mathbf{v}}{\Delta\mathbf{x}\\, \Delta\mathbf{v}}
\end{equation}
$$

Suppose we are interested in long-range electric and magnetic fields that extend over distances much larger than the Debye length. Then we can imagine a box, centered around the point $\mathbf{x}$ in configuration space, of a size much greater than a mean interparticle spacing, but much smaller than a Debye length. We can then count the number of particles of species $s$ in the box at time $t$ with velocities in the range $\mathbf{v}$ to $\mathbf{v} + \Delta\mathbf{v}$, divide by the size of the box (multiplied by $\Delta v_x \\, \Delta v_y \\, \Delta v_z$) and call the result $f_s(\mathbf{x}, \mathbf{v}, t)$. The number will of course fluctuate with time, but if there are very many particles in the box, the fluctuations will be tiny and the $f_s(\mathbf{x}, \mathbf{v}, t)$ obtained in this manner will agree very well with that obtained 

The equation of a line is

$$
y = mx + c
$$