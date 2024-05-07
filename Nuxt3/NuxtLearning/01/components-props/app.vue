<script setup lang="ts">
//会員リストデータを用意。
const memberListInit = new Map<number, Member>();
memberListInit.set(33456, {id: 33456, name: "田中太郎", email: "bow@example.com", points: 35, note: "初回入会特典あり。"});
memberListInit.set(47783, {id: 47783, name: "鈴木二郎", email: "mue@example.com", points: 53});
const memberList = ref(memberListInit);
const totalPoints = computed(
	(): number => {
		let total = 0;
		for(const member of memberList.value.values()) {
			total += member.points;
		}
		return total;
	}
);

//会員情報インターフェース。
interface Member {
	id: number;
	name: string;
	email: string;
	points: number;
	note?: string;
}
</script>
<template>
  <sectioon>
    <h1>会員リスト</h1>
    <p>全会員の保有ポイントの合計：{{ totalPoints }}</p>
    <!-- 以下はコンポーネント -->
    <OneMember
      v-for="[id, member] in memberList"
      v-bind:key="id"
      v-bind:id="id"
      v-bind:name="member.name"
      v-bind:email="member.email"
      v-bind:points="member.points"
      v-bind:note="member.note"
    />
  </sectioon>
</template>