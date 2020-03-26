<template>
    <b-dropdown aria-role="list">
        <b-button
        type="is-info"
        :icon-left="allNotificationsRead ? 'bell' : 'bell-ring'"
        outlined
        slot="trigger" slot-scope="{ active }"
        @click="handleNotificationPopupOpen"
        >
        <span>Notifications</span>
        <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
        </b-button>
        <b-dropdown-item
        aria-role="listitem"
        v-for="notification in notifications"
        :key="notification.Notification_ID"
        @click="redirectToPost(notification.Post_ID)"
        >
        <div class='container'>
            {{ notification.Parent_ID ?
            'New reply to your comment!'
            : 'New reply on your post!' }}
            <div>On "{{ notification.Title }}"</div>
            <div><b-icon icon="reply" size="is-small"/>&nbsp;{{notification.ageString}}</div>
        </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import { API_ADDRESS } from '../constants';

export default {
  name: 'NotificationDropdown',
  data: () => ({
    notifications: [],
  }),
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      // const mockedNotifications = [
      //   {
      //     Parent_ID: 2,
      //     Title: 'Download Swip',
      //     ageString: '1 day ago',
      //     Post_ID: 1,
      //     Notification_ID: 0,
      // ];
      // this.notifications = mockedNotifications;
      try {
        const res = await fetch(`${API_ADDRESS}/api/getNotifications?userId=${localStorage.getItem('User_ID')}&limit=25`);
        const data = await res.json();
        this.notifications = Array.from(data);
      } catch (err) {
        console.error(err);
      }
    },
    async handleNotificationPopupOpen() {
      this.isNotificationPopupActive = true;
      if (!this.allNotificationsRead) {
        try {
          await fetch(`${API_ADDRESS}/api/markNotificationsAsRead`, {
            method: 'POST',
            body: JSON.stringify({ userId: localStorage.getItem('User_ID') }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          this.notifications = this.notifications.map((notification) => {
            const newNotification = { ...notification };
            newNotification.Is_Read = true;
            return newNotification;
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    redirectToPost(postId) {
      this.$router.push(`/viewpost/${postId}`);
    },
  },
  computed: {
    allNotificationsRead() {
      if (!this.notifications || this.notifications.length === 0) return true;
      return this.notifications.every((notification) => notification.Is_Read);
    },
  },
};
</script>

<style scoped>
</style>
