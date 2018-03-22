/* confirm组件 */
<template>
  <div id="confirm" class="message-wrapper" @click.self="cancel">
    <div class="message-content confirm">
      <div class="message-title">{{ title }}</div>
      <div class="message-text">{{ content }}</div>
      <div class="buttons">
        <button class="md-button flat" @click="cancel">取消</button>
        <button class="md-button flat" @click="ok">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      content: String
    },
    methods: {
      ok () {
        // Close confirm dialog and send 'true' to its caller
        this.$close(true)
      },
      cancel () {
        this.$close(false)
      }
    }
  }
</script> 
<style scoped>
  /* confirm */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.33s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }


  .md-textfield {
    height: 36px;
    padding: 16px 0 8px 0;
    border: 0;
    border-bottom: 1px solid #9e9e9e;
    color: #212121;
    width: 350px;

  }
    .md-textfield:focus {
      padding-bottom: 7px;
      border-bottom: 2px solid #2196F3;
    }

  .md-button {
    font-size: 16px;
    height: 36px;
    padding: 0 16px;
    border: 0;
    border-radius: 2px;
    flex-shrink: 0;
    text-transform: uppercase;
    color: white;
    background-color: #2196F3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.33);
    transition: 0.33s ease;
}
    .md-button:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.33);
    }

    .md-button:active {
      background-color: #1976D2;
    }

    .md-button.flat {
      color: #2196F3;
      background-color: transparent;
      box-shadow: none;
}
      .md-button.flat:active {
        background-color: rgba(0, 0, 0, 0.1);
      }


  .one-button {
    margin: 16px 0;
    text-align: center;
  }

  .message-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.33);
  }

  #confirm .message-title {
    font-size: 16px;
    font-weight: bold;
  }

  .message-content {
    padding: 32px;
    border-radius: 2px;
    margin: 0 16px;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.33);
    display: block;
  }

  .confirm {
    padding-bottom: 16px;
  }

  .message-text {
    margin: 16px 0;
    font-size: 18px;
    text-align: left;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .source {
    display: block;
    text-align: center;
    text-transform: uppercase;
    color: #9e9e9e;
    font-size: 14px;
  }
</style>
