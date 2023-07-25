---
title: The Klimontovich Equation
subtitle: Although it's not feasible to solve for any practical system, the Klimontovich equation equation is a good entry point into the kinetic theory of plasmas.
layout: blog-post.njk
date: 2023-05-26
keywords: kinetic theory, plasma physics
publish: false
tags: posts
---
This is the first of a series of posts on the kinetic theory of plasmas. My aim with this series is to start with a fully kinetic picture (the topic of this post), then introduce the concept of an ensemble average and a distribution function, derive the ensemble-averaged kinetic (i.e. Vlasov) equation, discuss collision operators, then provide a comprehensive derivation of gyrokinetic theory and explan its use as a tool for modelling plasma turbulence (my research focus). I'm primarily writing these notes for my own benefit, but I've chosen to upload them here in the hopes that they might one day assist fellow bewildered PhD students who happen to stumble upon them.

A good place to start with all this is the Klimontovich picture of kinetic theory \cite{klimontovich1967statistical}. This is a "fully kinetic" description of a plasma, which means it retains all the information about single particle orbits that you'd find in any introductary plasma physics textbook. As a result, the Klimontovich equation is completely general, which is nice, but it also means that it is not generally possible to evolve it for any reasonably sized plasma. Still, pedagogically speaking, the Klimontovich equation is very useful because it serves as a useful starting point for the derivation of approximate equations (e.g. the Vlasov equation) that describe the time evolution of *average* properties of the plasma. In this post, I'll present a short derivation of the Klimontovich equation that follows the derivation given in Nicholson's textbook \cite{nicholson1983introduction}. 

In the Klimontovich picture of kinetic theory, the phase space density $\mathcal{N_s}$ for a system of $N_s$ particles of species $s$ is given by

$$
\begin{equation}
  \mathcal{N_s}(\mathbf{x}, \mathbf{v}, t) = \sum_{i=1}^N \delta\left(\mathbf{x} - \mathbf{x}_i(t)\right) \delta\left(\mathbf{v} - \mathbf{v}_i(t)\right),
\end{equation}
$$

where $\mathbf{x}_i(t)$ and $\mathbf{v}_i(t)$ are the time-varying position and velocity of the $i$-th particle respectively. In the literature, $\mathbf{x}_i$ and $\mathbf{v}_i$ are referred to as the "Lagrangian coordinates" of the particle itself, whereas $\mathbf{x}$ and $\mathbf{v}$ are the "Eulerian coordinates" of the phase space. The normalisation of $\mathcal{N_s}$ is given by

$$
\begin{equation}
\int \mathcal{N_s}(\mathbf{x}, \mathbf{v}) \\, \mathrm{d}\mathbf{x}\\,\mathrm{d}\mathbf{v} = 
  \sum_{i=1}^N\int \delta(\mathbf{x} - \mathbf{x}_i) \\, \delta(\mathbf{v} - \mathbf{v}_i) \\, \mathrm{d}\mathbf{x}\\,\mathrm{d}\mathbf{v} = N_s.
\end{equation}
$$

A pictoral representation of $\mathcal{N_s}$ is shown in Figure 1.

<div class="figure">
    <img src="/img/phase-space.svg" style="width: 45%; display: block; margin: 0 auto;"
    alt="some alt text"/>
    <div class="caption">
        <span class="caption-label">Figure 1:</span> A pictoral representation of the phase space density $\mathcal{N_s}$ for a system with $N_s = 3$ particles. The phase space density is zero at all points except at the phase space locations of particles.
    </div>
</div>

The aim here is to obtain an equation that describes the time evolution of $\mathcal{N_s}$, so we'll take the time derivative of Equation $1$.

$$
\begin{equation}
\frac{\partial \mathcal{N_s}}{\partial t} = \frac{\partial}{\partial t} \left[ \sum_i \delta(\mathbf{x} - \mathbf{x}_i) \\, \delta(\mathbf{v} - \mathbf{v}_i) \right]
\end{equation}
$$

Next, we'll take the derivative inside the sum and apply the product rule to give

$$
\begin{equation}
  \frac{\partial N_s}{\partial t} = \sum_i 
  \left[ 
    \delta(\mathbf{v} - \mathbf{v}_i)\frac{\partial}{\partial t}\\,\delta(\mathbf{x} - \mathbf{x}_i) 
    + 
    \delta(\mathbf{x} - \mathbf{x}_i)\frac{\partial}{\partial t}\\,\delta(\mathbf{v} - \mathbf{v}_i)
  \right].
\end{equation}
$$

We can then use the chain rule to express the time derivatives of the delta-functions as

$$
\begin{align}
\frac{\partial}{\partial t}\\,\delta(\mathbf{x} - \mathbf{x}_i) &= - \frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) \\\\
\frac{\partial}{\partial t}\\,\delta(\mathbf{v} - \mathbf{v}_i) &= - \frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i).
\end{align}
$$

For a proof of these relations, see the Appendix at the end of this post. This now allows Equation $4$ to be written as

$$
\begin{equation}
  \frac{\partial\mathcal{N_s}}{\partial t} = -\sum_i 
  \left[ 
    \delta(\mathbf{v} - \mathbf{v}_i)\frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i)
    + 
    \delta(\mathbf{x} - \mathbf{x}_i)\frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i) 
  \right].
\end{equation}
$$

At this point it is instructive to identify $\mathrm{d}\mathbf{x}_i/\mathrm{d}t \equiv \mathbf{v}_i$ and $\mathrm{d}\mathbf{v}_i/\mathrm{d}t$ as the velocity and acceleration of the $i$-th particle respectively. The latter is given by the Lorentz force law, 

$$
\begin{equation}
\frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} = \frac{q_i}{m_i}\left[
  \mathbf{E}(\mathbf{x}_i, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}_i, t)
\right]
\end{equation}
$$

where $\mathbf{E}(\mathbf{x}_i, t)$ and $\mathbf{B}(\mathbf{x}_i, t)$ are, respectively, the electric and magnetic fields at the $i$-th particle's position $\mathbf{x}_i$ at time $t$. Substituting Equation $8$ into $7$ then gives

$$
\begin{aligned}
  \frac{\partial\mathcal{N_s}}{\partial t} = -\sum_i 
\bigg[
  & \delta (\mathbf{v} - \mathbf{v}_i)\mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) \\\\
  & + \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}_i, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}_i, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i)
  \bigg] \tag{9}
\end{aligned}
$$

We'll now use the following delta-function identity

$$
\begin{equation*}
 f(a) \\, \delta(a-b) = f(b) \\, \delta(a-b), \tag{10}
\end{equation*}
$$

which is simply a consequence of the sifting property of the delta-function, to re-write the delta-functions in Equation $9$ as

$$
\begin{align*}
  \mathbf{v}_i \\, \delta(\mathbf{v} - \mathbf{v}_i) &= \mathbf{v} \\, \delta(\mathbf{v} - \mathbf{v}_i) \\\\
  \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}_i, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}_i, t)
\right] &= \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v}_i \times \mathbf{B}(\mathbf{x}, t)
\right]. \tag{11}
\end{align*}
$$

Note that $\mathbf{E}$ and $\mathbf{B}$ are now written as functions of $\mathbf{x}$ instead of $\mathbf{x_i}$. We also note that the $\mathbf{v}_i$ in the cross product in Equation $9$ can be taken inside the $\partial/\partial\mathbf{v}$ deriviative, allowing identity $10$ to be applied once again to give

$$
\begin{aligned}
  \frac{\partial\mathcal{N_s}}{\partial t} = -\sum_i 
\bigg[
  & \delta (\mathbf{v} - \mathbf{v}_i)\mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) \\\\
  & + \delta(\mathbf{x} - \mathbf{x}_i)\frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v} \times \mathbf{B}(\mathbf{x}, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \\,\delta(\mathbf{v} - \mathbf{v}_i)
  \bigg]. \tag{12}
\end{aligned}
$$

Now we'll take the $\delta(\mathbf{v}-\mathbf{v}_i)$ inside the $\partial/\partial\mathbf{x}$ deriviative as it does not depend on $\mathbf{x}$, and likewise for the $\delta(\mathbf{x}-\mathbf{x}_i)$, to give

$$
\begin{aligned}
  \frac{\partial\mathcal{N_s}}{\partial t} = -\sum_i 
\bigg[
  & \mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \left[\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right] \\\\
  & + \frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v} \times \mathbf{B}(\mathbf{x}, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \left[\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right]
  \bigg]. \tag{13}
\end{aligned}
$$

Shifting the sum then gives

$$
\begin{aligned}
  \frac{\partial\mathcal{N_s}}{\partial t} = -
  & \mathbf{v} \cdot \frac{\partial}{\partial \mathbf{x}} \left[\sum_i\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right] \\\\
  & - \frac{q}{m}\left[
  \mathbf{E}(\mathbf{x}, t) + \mathbf{v} \times \mathbf{B}(\mathbf{x}, t)
\right] \cdot \frac{\partial}{\partial \mathbf{v}} \left[\sum_i\delta(\mathbf{x} - \mathbf{x}_i)\delta(\mathbf{v} - \mathbf{v}_i)\right],
 \tag{14}
\end{aligned}
$$

and lastly, we identify the terms in the large square brackets as the phase density $\mathcal{N_s}$. If we then rearrange so that all of the terms are on one side, we arrive at the Klimontovich equation:

$$
\begin{equation}
  \frac{\partial\mathcal{N_s}}{\partial t} + \mathbf{v} \cdot \frac{\partial\mathcal{N_s}}{\partial\mathbf{x}} + \frac{q}{m}\left(\mathbf{E} + \mathbf{v}\times\mathbf{B}\right) \cdot \frac{\partial\mathcal{N_s}}{\partial\mathbf{v}} = 0.
 \tag{15}
\end{equation}
$$

The Klimontovich equation, together with Maxwell's equations, constitute an exact description of a plasma. Given the initial positions and velocities of each of the particles, the initial density $\mathcal{N_s}(\mathbf{x}, \mathbf{v}, t=0)$ is given exactly by Equation $1$. The initial fields $\mathbf{E}$ and $\mathbf{B}$ are then chosen to be consistent with Maxwell's equations. With these initial conditions, the problem is completely deterministic. In practice, however, no one ever carries out this procedure. The Klimontovich equation contains every one of the exact single particle orbits. This is far more information than we want or need. It also requires the initial position and velocity of every particle, which is more information than we have! What we really want is information about certain *average* properties of the plasma. We do not really care about all of the individual electromagnetic fields contributed by the individual charges. What we do care about is the average long-range electric field, which might exist over many thousands or millions of interparticle spacings. The usefulness of the Klimontovich equation comes from its role as a starting point in the derivation of the equations that describe these more useful average properties of a plasma. 

We end by noting that the Klimontovich equation can be thought of as a statement of incompressibility of the "substance" $\mathcal{N_s}(\mathbf{x}, \mathbf{v}, t)$ as it moves about in phase space. This can be seen be defining the generalised convective deriative as

$$
\begin{equation}
  \frac{\mathrm{D}}{\mathrm{D}t} = \frac{\partial}{\partial t} + \mathbf{v}\cdot\frac{\partial}{\partial\mathbf{x}} + \mathbf{a}\cdot\frac{\partial}{\partial\mathbf{v}},
 \tag{16}
\end{equation}
$$

allowing the Klimontovich equation to be stated as simply

$$
\begin{equation}
  \frac{\mathrm{D}\mathcal{N_s}}{\mathrm{D}t} = 0
 \tag{17}
\end{equation}
$$

i.e. the phase density of particles of species $s$ is constant in time. 

## Appendix
Here we use the chain rule to prove relations $5$ and $6$. Starting with the time derivative of the three-dimensional delta-function $\delta(\mathbf{x} - \mathbf{x}_i)$,

$$
\begin{align*}
\frac{\partial}{\partial t}\\, \delta(\mathbf{x} - \mathbf{x}_i)
  &= \frac{\partial}{\partial t}\left[\delta(x - x_i) \\, \delta(y - y_i) \\, \delta(z - z_i) \right] \\\\
  &= \frac{\partial}{\partial t}\left[\delta(x - x_i)\right] \delta(y - y_i) \\, \delta(z - z_i) \\\\
  &\quad + \delta(x - x_i) \frac{\partial}{\partial t}\left[\delta(y - y_i)\right] \delta(z - z_i) \\\\
  &\quad + \delta(x - x_i) \\, \delta(y - y_i) \frac{\partial}{\partial t}\left[\delta(z - z_i)\right] \tag{18}
\end{align*}
$$

To evaluate the time derivatives, we'll use the following trick. Let $f$ be a functional of function $W(x, t)$, i.e. $f = f[W(x, t)]$. By the chain rule,

$$
\begin{equation*}
\frac{\partial f}{\partial t} = \frac{\mathrm{d}f}{\mathrm{d}W}\frac{\partial W}{\partial t}. \tag{19}
\end{equation*}
$$

If $\partial W/\partial x = 1$, then

$$
\begin{equation*}
\frac{\partial f}{\partial x} = \frac{\mathrm{d}f}{\mathrm{d}W}\frac{\partial W}{\partial x} = \frac{\mathrm{d}f}{\mathrm{d}W}. \tag{20}
\end{equation*}
$$

Thus, for $\partial W/\partial x = 1$, we have

$$
\begin{equation*}
\frac{\partial f}{\partial t} = \frac{\mathrm{d}f}{\mathrm{d}W}\frac{\partial W}{\partial t} = \frac{\partial f}{\partial x}\frac{\partial W}{\partial t}. \tag{21}
\end{equation*}
$$

Now, returning to the problem at hand, we can identify $\delta \rightarrow f$ and $W \rightarrow x - x_i(t)$. Therefore, the time derivative of the delta-function can be written

$$
\begin{equation*}
\frac{\partial}{\partial t}\\,\delta(x - x_i) 
= \frac{\partial\delta(x - x_i)}{\partial x}\frac{\partial\delta(x - x_i)}{\partial t} 
= \frac{\partial\delta(x - x_i)}{\partial x}\left(-\frac{\mathrm{d} x_i}{\mathrm{d}t}\right). \tag{22}
\end{equation*}
$$

Using the analogous expressions for the time derivatives of the $y$ and $z$ delta-functions, Equation $1$ can be written as

$$
\begin{align*}
\frac{\partial}{\partial t}\\,\delta(\mathbf{x} - \mathbf{x}_i)
  &= -\frac{\partial\delta(x - x_i)}{\partial x}\frac{\mathrm{d} x_i}{\mathrm{d}t} \delta(y - y_i) \\, \delta(z - z_i) \\\\
  &\quad - \delta(x - x_i) \frac{\partial\delta(y - y_i)}{\partial y}\frac{\mathrm{d} y_i}{\mathrm{d}t} \delta(z - z_i) \\\\
  &\quad - \delta(x - x_i) \\, \delta(y - y_i) \frac{\partial\delta(z - z_i)}{\partial z}\frac{\mathrm{d} z_i}{\mathrm{d}t} \\\\ 
  &= - \frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} \cdot \frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i), \tag{23}
\end{align*}
$$

where

$$
\begin{equation*}
 \frac{\mathrm{d}\mathbf{x}_i}{\mathrm{d}t} = \hat{x}\frac{\mathrm{d}x_i}{\mathrm{d}t} + \hat{y}\frac{\mathrm{d}y_i}{\mathrm{d}t} + \hat{z}\frac{\mathrm{d}z_i}{\mathrm{d}t}
 \tag{24}
\end{equation*}
$$

and 

$$
\begin{equation*}
\frac{\partial}{\partial \mathbf{x}} \\,\delta(\mathbf{x} - \mathbf{x}_i) 
  = \left(\hat{x}\frac{\partial}{\partial x} + \hat{y}\frac{\partial}{\partial y} + \hat{x}\frac{\partial}{\partial z}\right)
  \left[\delta(x - x_i) \\, \delta(y - y_i) \\, \delta(z - z_i) \right]. \tag{25}
\end{equation*}
$$