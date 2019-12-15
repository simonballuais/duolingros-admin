<template>
  <div class="container-fluid">
    <div class="row">
      <SideMenu :title="'Lessons'">
        <LessonList></LessonList>
      </SideMenu>
    </div>
  </div>
</template>

<script>
import LessonList from './lesson/List'
import SideMenu from './nav/SideMenu'

export default {
  name: 'Home',
  components: {
    LessonList,
    SideMenu,
  }
}
</script>
