<template>
	<q-layout>
		<q-page-container class="">
			<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<router-view></router-view>
			</transition>
		</q-page-container>
	</q-layout>
</template>
<script>
export default {
}
</script>