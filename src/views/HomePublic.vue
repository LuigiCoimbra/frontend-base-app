<style>
.v-col {
	padding: 0 !important;
}
.gradient {
  display: flex !important;
  justify-content: center;
	align-items: center;
}

.gradient {
    width: 100%;
    height: 300px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) !important;
    background-size: 400% 400% !important;
    animation: gradient 15s ease infinite !important;
}
.v-img {
  mix-blend-mode: multiply;
  border-radius: 10px;
}

img {
    padding: 10px;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
<template>
    <v-card class="gradient">
            <v-img width="20%" src="@/assets/brain.png"></v-img>
            <v-card-title>Em Breve</v-card-title>
        </v-card>
</template>